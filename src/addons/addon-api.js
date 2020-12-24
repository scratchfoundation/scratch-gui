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
}

class Addon {
    constructor () {
        this.tab = new Tab();
    }
}

class AddonAPI {
    constructor () {
        this.global = global;
        this.console = console;
        this.addon = new Addon();
    }
}

export default AddonAPI;
