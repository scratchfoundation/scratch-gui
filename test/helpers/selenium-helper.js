jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

import bindAll from 'lodash.bindall';
import 'chromedriver'; // register path
import webdriver from 'selenium-webdriver';

const {By, until, Button} = webdriver;

const USE_HEADLESS = process.env.USE_HEADLESS !== 'no';

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'clickText',
            'clickButton',
            'clickXpath',
            'elementIsVisible',
            'findByText',
            'findByXpath',
            'getDriver',
            'getSauceDriver',
            'getLogs',
            'loadUri',
            'rightClickText',
            'waitUntilGone'
        ]);
    }

    elementIsVisible (element) {
        return this.driver.wait(until.elementIsVisible(element));
    }

    get scope () {
        // List of useful xpath scopes for finding elements
        return {
            blocksTab: "*[@id='react-tabs-1']",
            costumesTab: "*[@id='react-tabs-3']",
            modal: '*[@class="ReactModalPortal"]',
            reportedValue: '*[@class="blocklyDropDownContent"]',
            soundsTab: "*[@id='react-tabs-5']",
            spriteTile: '*[starts-with(@class,"react-contextmenu-wrapper")]',
            monitors: '*[starts-with(@class,"stage_monitor-wrapper")]'
        };
    }

    getDriver () {
        // It's not safe to replace an existing driver since there may be outstanding async chains already in progress.
        // Alternative solution: remove/replace all async code in this class which mentions `this.driver`
        if (!this.driver) {
            const chromeCapabilities = webdriver.Capabilities.chrome();
            const args = [];
            if (USE_HEADLESS) {
                args.push('--headless');
            }

            // Stub getUserMedia to always not allow access
            args.push('--use-fake-ui-for-media-stream=deny');

            chromeCapabilities.set('chromeOptions', {args});
            chromeCapabilities.setLoggingPrefs({
                performance: 'ALL'
            });
            this.driver = new webdriver.Builder()
                .forBrowser('chrome')
                .withCapabilities(chromeCapabilities)
                .build();
        }
        return this.driver;
    }

    getSauceDriver (username, accessKey, configs) {
        // It's not safe to replace an existing driver since there may be outstanding async chains already in progress.
        // Alternative solution: remove/replace all async code in this class which mentions `this.driver`
        if (!this.driver) {
            this.driver = new webdriver.Builder()
                .withCapabilities({
                    browserName: configs.browserName,
                    platform: configs.platform,
                    version: configs.version,
                    username: username,
                    accessKey: accessKey
                })
                .usingServer(`http://${username}:${accessKey
                }@ondemand.saucelabs.com:80/wd/hub`)
                .build();
        }
        return this.driver;
    }

    findByXpath (xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
    }

    findByText (text, scope) {
        return this.findByXpath(`//body//${scope || '*'}//*[contains(text(), '${text}')]`);
    }

    async loadUri (uri) {
        const WINDOW_WIDTH = 1024;
        const WINDOW_HEIGHT = 768;

        await this.driver.get(`file://${uri}`);
        const window = await this.driver.manage().window();
        await window.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
        await this.driver.executeScript('window.onbeforeunload = undefined;');
    }

    clickXpath (xpath) {
        return this.driver.wait(async () => {
            const element = await this.findByXpath(xpath);
            return element.click().then(() => true, () => false);
        });
    }

    clickText (text, scope) {
        return this.driver.wait(async () => {
            const element = await this.findByText(text, scope);
            return element.click().then(() => true, () => false);
        });
    }

    rightClickText (text, scope) {
        return this.driver.wait(async () => {
            const element = await this.findByText(text, scope);
            return this.driver.actions()
                .click(element, Button.RIGHT)
                .perform()
                .then(() => true, () => false);
        });
    }

    clickButton (text) {
        return this.clickXpath(`//button//*[contains(text(), '${text}')]`);
    }

    waitUntilGone (element) {
        return this.driver.wait(until.stalenessOf(element));
    }

    getLogs (whitelist) {
        if (!whitelist) {
            // Default whitelist
            whitelist = [
                'The play() request was interrupted by a call to pause()'
            ];
        }
        return this.driver.manage()
            .logs()
            .get('browser')
            .then(entries => entries.filter(entry => {
                const message = entry.message;
                for (let i = 0; i < whitelist.length; i++) {
                    if (message.indexOf(whitelist[i]) !== -1) {
                        return false;
                    } else if (entry.level !== 'SEVERE') {
                        return false;
                    }
                }
                return true;
            }));
    }
}

export default SeleniumHelper;
