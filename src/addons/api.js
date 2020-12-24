import translations from './l10n/en.json';

class Tab extends EventTarget {
    waitForElement (selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                return;
            }

            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    resolve(el);
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    get editorMode () {
        if (location.pathname.includes('editor')) return 'editor';
        if (location.pathname.includes('fullscreen')) return 'fullscreen';
        if (location.pathname.includes('editor')) return 'editor';
        return 'projectpage';
    }
}

class Addon {
    constructor () {
        this.tab = new Tab();
    }

    get settings () {
        throw new Error('not implemented');
    }
}

const addon = new Addon();

const emitUrlChange = () => {
    setTimeout(() => {
        addon.tab.dispatchEvent(new CustomEvent('urlChange'));
    });
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

class API {
    constructor (id) {
        this._id = id;
        this.global = global;
        this.console = console;
        this.addon = addon;
        this.msg = this.msg.bind(this);
    }

    msg (key) {
        const namespacedKey = `${this._id}/${key}`;
        if (translations[namespacedKey]) {
            return translations[namespacedKey];
        }
        return key;
    }
}

export default API;
