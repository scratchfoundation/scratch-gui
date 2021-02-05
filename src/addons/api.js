/**
 * @license
 * Copyright (c) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import IntlMessageFormat from 'intl-messageformat';
import SettingsStore from './settings-store';
import getAddonTranslations from './get-addon-translations';
import dataURLToBlob from './api-libraries/data-url-to-blob';
import fixHardcodedClassesCSS from '!raw-loader!./fix-hardcoded-classes.css';
import EventTargetShim from './event-target';

/* eslint-disable no-console */

const escapeHTML = str => str.replace(/([<>'"&])/g, (_, l) => `&#${l.charCodeAt(0)};`);
const kebabCaseToCamelCase = str => str.replace(/-([a-z])/g, g => g[1].toUpperCase());
const createStylesheet = css => {
    const style = document.createElement('style');
    style.textContent = css;
    return style;
};

let _scratchClassNames = null;
const getScratchClassNames = () => {
    if (_scratchClassNames) {
        return _scratchClassNames;
    }
    const classes = Array.from(document.styleSheets)
        // Ignore some scratch-paint stylesheets
        .filter(styleSheet => (
            !(
                styleSheet.ownerNode.textContent.startsWith(
                    '/* DO NOT EDIT\n@todo This file is copied from GUI and should be pulled out into a shared library.'
                ) &&
                (
                    styleSheet.ownerNode.textContent.includes('input_input-form') ||
                    styleSheet.ownerNode.textContent.includes('label_input-group_')
                )
            )
        ))
        .map(e => {
            try {
                return [...e.cssRules];
            } catch (_e) {
                return [];
            }
        })
        .flat()
        .map(e => e.selectorText)
        .filter(e => e)
        .map(e => e.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g))
        .filter(e => e)
        .flat();
    _scratchClassNames = [...new Set(classes)];
    return _scratchClassNames;
};

class Redux extends EventTargetShim {
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

const getEditorMode = () => {
    const mode = tabReduxInstance.state.scratchGui.mode;
    if (mode.isEmbedded) return 'embed';
    if (mode.isFullScreen) return 'fullscreen';
    if (mode.isPlayerOnly) return 'projectpage';
    return 'editor';
};

const tabReduxInstance = new Redux();
const language = tabReduxInstance.state.locales.locale.split('-')[0];
const translations = getAddonTranslations(language);

// Temporary
window.scratchAddons = {
    l10n: {
        lcoale: language
    }
};

document.head.appendChild(createStylesheet(fixHardcodedClassesCSS));

class Tab extends EventTargetShim {
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

    waitForElement (selector, {markAsSeen = false} = {}) {
        const firstQuery = document.querySelectorAll(selector);
        for (const element of firstQuery) {
            if (this._seenElements.has(element)) continue;
            if (markAsSeen) this._seenElements.add(element);
            return Promise.resolve(element);
        }

        return new Promise(resolve =>
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
                subtree: true
            })
        );
    }

    copyImage (dataURL) {
        if (!navigator.clipboard.write) {
            return Promise.reject(new Error('Clipboard API not supported'));
        }
        const items = [
            new ClipboardItem({
                'image/png': dataURLToBlob(dataURL)
            })
        ];
        return navigator.clipboard.write(items);
    }

    scratchClass (...args) {
        const scratchClasses = getScratchClassNames();
        const classes = [];
        for (const arg of args) {
            if (typeof arg === 'string') {
                for (const scratchClass of scratchClasses) {
                    if (scratchClass.startsWith(`${arg}_`) && scratchClass.length === arg.length + 6) {
                        classes.push(scratchClass);
                    }
                }
            }
        }
        const options = args[args.length - 1];
        if (typeof options === 'object') {
            const others = Array.isArray(options.others) ? options.others : [options.others];
            for (const className of others) {
                classes.push(className);
            }
        }
        return classes.join(' ');
    }

    get editorMode () {
        return getEditorMode();
    }
}

class Settings extends EventTargetShim {
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
    // These are removed at build-time by pull.js. Throw if attempting to access them at runtime.
    get dir () {
        throw new Error(`Addon tried to access addon.self.dir`);
    }
    get lib () {
        throw new Error(`Addon tried to access addon.self.lib`);
    }
}

class AddonRunner {
    constructor (id, manifest) {
        AddonRunner.instances.push(this);

        this.id = id;
        this.manifest = manifest;
        this.messageCache = {};

        this.msg.locale = language;
        this.publicAPI = {
            global,
            console,
            addon: {
                tab: new Tab(),
                settings: new Settings(id, manifest),
                self: new Self()
            },
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

    async _run () {
        this.updateCSSVariables();

        if (this.manifest.userstyles) {
            for (const userstyle of this.manifest.userstyles) {
                const m = await import(
                    /* webpackInclude: /\.css$/ */
                    /* webpackMode: "eager" */
                    `!css-loader!./addons/${this.id}/${userstyle.url}`
                );
                const source = m.default[0][1];
                const style = createStylesheet(source);
                style.className = 'scratch-addons-theme';
                style.dataset.addonId = this.id;
                // Insert styles at the start of the body so that they have higher precedence than those in <head>
                document.body.insertBefore(style, document.body.firstChild);
            }
        }

        if (this.manifest.userscripts) {
            for (const userscript of this.manifest.userscripts) {
                const m = await import(
                    /* webpackInclude: /\.js$/ */
                    /* webpackMode: "eager" */
                    `./addons/${this.id}/${userscript.url}`
                );
                m.default(this.publicAPI);
            }
        }
    }

    async run () {
        this._run();
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

SettingsStore.addEventListener('store-changed', () => {
    for (const runner of AddonRunner.instances) {
        runner.settingsChanged();
    }
});

export default AddonRunner;
