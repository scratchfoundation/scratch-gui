/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
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
import SettingsStore from './settings-store-singleton';
import getAddonTranslations from './get-addon-translations';
import dataURLToBlob from '../lib/data-uri-to-blob';
import EventTargetShim from './event-target';
import './polyfill';

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
    const cssRules = Array.from(document.styleSheets)
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
        .flat();
    const classes = cssRules
        .map(e => e.selectorText)
        .filter(e => e)
        .map(e => e.match(/(([\w-]+?)_([\w-]+)_([\w\d-]+))/g))
        .filter(e => e)
        .flat();
    _scratchClassNames = [...new Set(classes)];
    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'STYLE') {
                    _scratchClassNames = null;
                    observer.disconnect();
                    return;
                }
            }
        }
    });
    observer.observe(document.head, {
        childList: true
    });
    return _scratchClassNames;
};

let _mutationObserver;
let _mutationObserverCallbacks = [];
const addMutationObserverCallback = newCallback => {
    if (!_mutationObserver) {
        _mutationObserver = new MutationObserver(() => {
            for (const cb of _mutationObserverCallbacks) {
                cb();
            }
        });
        _mutationObserver.observe(document.documentElement, {
            attributes: false,
            childList: true,
            subtree: true
        });
    }
    _mutationObserverCallbacks.push(newCallback);
};
const removeMutationObserverCallback = callback => {
    _mutationObserverCallbacks = _mutationObserverCallbacks.filter(i => i !== callback);
};

class Redux extends EventTargetShim {
    constructor () {
        super();
        this._initialized = false;
        this._nextState = null;
    }

    initialize () {
        if (!this._initialized) {
            window.__APP_STATE_REDUCER__ = (action, next) => {
                this._nextState = next;
                this.dispatchEvent(new CustomEvent('statechanged', {
                    detail: {
                        action,
                        next
                    }
                }));
                this._nextState = null;
            };

            this._initialized = true;
        }
    }

    dispatch (m) {
        return __APP_STATE_STORE__.dispatch(m);
    }

    get state () {
        if (this._nextState) return this._nextState;
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

class Tab extends EventTargetShim {
    constructor () {
        super();
        this._seenElements = new WeakSet();
        this._isFirstWaitForElement = false;
        // traps is public API
        this.traps = {
            get vm () {
                // We expose VM on window
                return window.vm;
            },
            getBlockly: () => {
                // The real Blockly is exposed on window. It may not exist until the user enters the editor.
                if (window.ScratchBlocks) {
                    return Promise.resolve(window.ScratchBlocks);
                }
                return new Promise((resolve, reject) => {
                    const handler = () => {
                        if (window.ScratchBlocks) {
                            this.removeEventListener('urlChange', handler);
                            resolve(window.ScratchBlocks);
                        }
                    };
                    this.addEventListener('urlChange', handler);
                });
            }
        };
    }

    get redux () {
        return tabReduxInstance;
    }

    loadScript () {
        throw new Error('loadScript is not supported');
    }

    waitForElement (selector, {markAsSeen = false, condition, reduxEvents} = {}) {
        if (this._isFirstWaitForElement) {
            this._isFirstWaitForElement = false;
            reduxEvents = null;
        }

        const firstQuery = document.querySelectorAll(selector);
        for (const element of firstQuery) {
            if (this._seenElements.has(element)) continue;
            if (markAsSeen) this._seenElements.add(element);
            return Promise.resolve(element);
        }

        let reduxListener;
        if (reduxEvents) {
            let reduxEventSatisifed = false;
            reduxListener = ({detail}) => {
                if (reduxEvents.includes(detail.action.type)) {
                    reduxEventSatisifed = true;
                }
            };
            condition = () => {
                if (reduxEventSatisifed) {
                    reduxEventSatisifed = false;
                    return true;
                }
                return false;
            };
            this.redux.initialize();
            this.redux.addEventListener('statechanged', reduxListener);
        }

        return new Promise(resolve => {
            const callback = () => {
                if (condition && !condition()) {
                    return;
                }
                const elements = document.querySelectorAll(selector);
                for (const element of elements) {
                    if (this._seenElements.has(element)) continue;
                    resolve(element);
                    removeMutationObserverCallback(callback);
                    if (markAsSeen) this._seenElements.add(element);
                    if (reduxListener) {
                        this.redux.removeEventListener('statechanged', reduxListener);
                    }
                    break;
                }
            };
            addMutationObserverCallback(callback);
        });
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
                        break;
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

    displayNoneWhileDisabled () {
        // no-op
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

class Self extends EventTargetShim {
    // These are removed at build-time by pull.js. Throw if attempting to access them at runtime.
    get dir () {
        throw new Error(`Addon tried to access addon.self.dir`);
    }
    get lib () {
        throw new Error(`Addon tried to access addon.self.lib`);
    }
    get disabled () {
        // no-op
        return false;
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
                if (setting.type === 'color') {
                    const settingId = setting.id;
                    const variable = `--${kebabCaseId}-${kebabCaseToCamelCase(settingId)}`;
                    const value = this.publicAPI.addon.settings.get(settingId);
                    document.documentElement.style.setProperty(variable, value);
                }
            }
        }
    }

    settingsMatch (settingMatch) {
        if (!settingMatch) {
            // No settings to match.
            return true;
        }
        const settingValue = this.publicAPI.addon.settings.get(settingMatch.id);
        return settingValue === settingMatch.value;
    }

    async _run () {
        this.updateCSSVariables();

        if (this.manifest.userstyles) {
            for (const userstyle of this.manifest.userstyles) {
                if (!this.settingsMatch(userstyle.settingMatch)) {
                    continue;
                }
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
                if (!this.settingsMatch(userscript.settingMatch)) {
                    continue;
                }
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
