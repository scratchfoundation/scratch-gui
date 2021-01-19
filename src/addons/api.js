import IntlMessageFormat from 'intl-messageformat';
import SettingsStore from './settings-store';
import getAddonTranslations from './get-addon-translations';
import dataURLToBlob from './api-libraries/data-url-to-blob';

const escapeHTML = (str) => str.replace(/([<>'"&])/g, (_, l) => `&#${l.charCodeAt(0)};`);
const kebabCaseToCamelCase = (str) => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

class Redux extends EventTarget {
    constructor () {
        super();
        this._initialized = false;
    }

    initialize () {
        if (!this._initialized) {
            window.__APP_STATE_REDUCER__ = (action, next) => {
                this.dispatchEvent(new CustomEvent('statechanged', {
                    detail: {
                        action,
                        next
                    }
                }));
            };

            this._initialized = true;
        }
    }

    dispatch (m) {
        return __APP_STATE_STORE__.dispatch(m);
    }

    get state () {
        return __APP_STATE_STORE__.getState();
    }
}

const tabReduxInstance = new Redux();
const language = tabReduxInstance.state.locales.locale.split('-')[0];
const translations = getAddonTranslations(language);

// Temporary until upstream removes window.scratchAddons
window.scratchAddons = {
    l10n: {
        locale: language
    }
};

const getEditorMode = () => {
    const mode = tabReduxInstance.state.scratchGui.mode;
    if (mode.isEmbedded) return 'embed';
    if (mode.isFullScreen) return 'fullscreen';
    if (mode.isPlayerOnly) return 'projectpage';
    return 'editor';
};

class Tab extends EventTarget {
    constructor () {
        super();
        this._seenElements = new WeakSet();
        this.traps = {
            get vm () {
                // We expose VM on window
                return window.vm;
            }
        };
    }

    get redux () {
        return tabReduxInstance;
    }

    loadScript (src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Cannot load script'));
            script.src = src;
            document.body.appendChild(script);
        });
    }

    waitForElement (selector, { markAsSeen = false } = {}) {
        const firstQuery = document.querySelectorAll(selector);
        for (const element of firstQuery) {
            if (this._seenElements.has(element)) continue;
            if (markAsSeen) this._seenElements.add(element);
            return Promise.resolve(element);
        }

        return new Promise((resolve) =>
            new MutationObserver((mutationsList, observer) => {
                const elements = document.querySelectorAll(selector);
                for (const element of elements) {
                    if (this._seenElements.has(element)) continue;
                    observer.disconnect();
                    resolve(element);
                    if (markAsSeen) this._seenElements.add(element);
                    break;
                }
            }).observe(document.documentElement, {
                attributes: false,
                childList: true,
                subtree: true,
            })
        );
    }

    copyImage (dataURL) {
        if (!navigator.clipboard.write) {
            return Promise.reject(new Error('Clipboard API not supported'));
        }
        const items = [
            new ClipboardItem({
                "image/png": dataURLToBlob(dataURL),
            })
        ];
        return navigator.clipboard.write(items);
    }

    get editorMode () {
        return getEditorMode();
    }
}

class Settings extends EventTarget {
    constructor (addonId, manifest) {
        super();
        this._addonId = addonId;
        this._manifest = manifest;
    }

    get (id) {
        return SettingsStore.getAddonSetting(this._addonId, id);
    }
}

class Self {
    constructor (id) {
        this.dir = `addon-files/${id}`;
        this.lib = 'addon-files/libraries-raw';
    }
}

class Addon {
    constructor (addonId, manifest) {
        this.tab = new Tab();
        this.settings = new Settings(addonId, manifest);
        this.self = new Self(addonId);
    }
}

class AddonRunner {
    constructor (id, manifest) {
        AddonRunner.instances.push(this);

        this.id = id;
        this.manifest = manifest;
        this.messageCache = {};

        this.publicAPI = {
            global,
            console,
            addon: new Addon(id, manifest),
            msg: this.msg.bind(this),
            safeMsg: this.safeMsg.bind(this)
        };
    }

    _msg (key, vars, handler) {
        const namespacedKey = `${this.id}/${key}`;
        if (this.messageCache[namespacedKey]) {
            return this.messageCache[namespacedKey].format(vars);
        }
        let translation = translations[namespacedKey];
        if (!translation) {
            return namespacedKey;
        }
        if (handler) {
            translation = handler(translation);
        }
        const messageFormat = new IntlMessageFormat(translation, language);
        this.messageCache[namespacedKey] = messageFormat;
        return messageFormat.format(vars);
    }

    msg (key, vars) {
        return this._msg(key, vars, null);
    }

    safeMsg (key, vars) {
        return this._msg(key, vars, escapeHTML);
    }

    settingsChanged () {
        this.publicAPI.addon.settings.dispatchEvent(new CustomEvent('change'));
        this.updateCSSVariables();
    }

    updateCSSVariables () {
        if (this.manifest.settings) {
            const kebabCaseId = kebabCaseToCamelCase(this.id);
            for (const setting of this.manifest.settings) {
                const settingId = setting.id;
                const variable = `--${kebabCaseId}-${kebabCaseToCamelCase(settingId)}`;
                const value = this.publicAPI.addon.settings.get(settingId);
                document.documentElement.style.setProperty(variable, value);
            }
        }
    }

    _run () {
        this.updateCSSVariables();

        if (this.manifest.userstyles) {
            for (const userstyle of this.manifest.userstyles) {
                const source = require(`./addons/${this.id}/${userstyle.url}`);
                const style = document.createElement('style');
                style.className = 'scratch-addons-theme';
                style.dataset.addonId = this.id;
                style.innerText = source;
                // Insert styles at the start of the body so that they have higher precedence than those in <head>
                document.body.insertBefore(style, document.body.firstChild);
            }
        }

        if (this.manifest.userscripts) {
            for (const userscript of this.manifest.userscripts) {
                require(`./addons/${this.id}/${userscript.url}`).default(this.publicAPI);
            }
        }
    }

    run () {
        try {
            this._run();
        } catch (e) {
            console.error('Addon error', e);
        }
    }
}
AddonRunner.instances = [];

let oldMode = getEditorMode();
const emitUrlChange = () => {
    // In Scratch, URL changes usually mean someone went from editor to fullscreen or something like that.
    // This is not the case in TW -- the URL can change for many other reasons that addons probably aren't prepared to handle.
    const newMode = getEditorMode();
    if (newMode !== oldMode) {
        oldMode = newMode;
        setTimeout(() => {
            for (const addon of AddonRunner.instances) {
                addon.publicAPI.addon.tab.dispatchEvent(new CustomEvent('urlChange'));
            }
        });
    }
};
const originalReplaceState = history.replaceState;
history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    emitUrlChange();
};
const originalPushState = history.pushState;
history.pushState = function (...args) {
    originalPushState.apply(this, args);
    emitUrlChange();
};

SettingsStore.addEventListener('reread', () => {
    for (const runner of AddonRunner.instances) {
        runner.settingsChanged();
    }
});

export default AddonRunner;
