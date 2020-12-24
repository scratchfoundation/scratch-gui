import translations from './l10n/en.json';

class Tab {
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

    addEventListener () {
        // no-op
    }

    get editorMode () {
        return 'editor';
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

class AddonAPI {
    constructor (id) {
        this._id = id;
        this.global = global;
        this.console = console;
        this.addon = new Addon();
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

export default AddonAPI;
