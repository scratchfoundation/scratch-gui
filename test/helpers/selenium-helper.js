jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

import bindAll from 'lodash.bindall';
import 'chromedriver'; // register path
import webdriver from 'selenium-webdriver';

const {By, until} = webdriver;

class SeleniumHelper {
    constructor () {
        bindAll(this, [
            'clickText',
            'clickButton',
            'clickXpath',
            'findByText',
            'findByXpath',
            'getDriver',
            'getLogs'
        ]);
    }

    getDriver () {
        this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        return this.driver;
    }

    findByXpath (xpath) {
        return this.driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
    }

    findByText (text, scope) {
        return this.findByXpath(`//body//${scope || '*'}//*[contains(text(), '${text}')]`);
    }

    clickXpath (xpath) {
        return this.findByXpath(xpath).then(el => el.click());
    }

    clickText (text, scope) {
        return this.findByText(text, scope).then(el => el.click());
    }

    clickButton (text) {
        return this.clickXpath(`//button[contains(text(), '${text}')]`);
    }

    getLogs (whitelist) {
        return this.driver.manage()
            .logs()
            .get('browser')
            .then(entries => entries.filter(entry => {
                const message = entry.message;
                for (let i = 0; i < whitelist.length; i++) {
                    if (message.indexOf(whitelist[i]) !== -1) {
                        // eslint-disable-next-line no-console
                        console.warn(`Ignoring whitelisted error: ${whitelist[i]}`);
                        return false;
                    } else if (entry.level !== 'SEVERE') {
                        // eslint-disable-next-line no-console
                        console.warn(`Ignoring non-SEVERE entry: ${message}`);
                        return false;
                    }
                }
                return true;
            }));
    }
}

export default SeleniumHelper;
