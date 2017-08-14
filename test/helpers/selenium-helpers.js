/* eslint-env jest */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

import webdriver from 'selenium-webdriver';

const {By, until} = webdriver;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const findByXpath = (xpath) => {
    return driver.wait(until.elementLocated(By.xpath(xpath), 5 * 1000));
};

const clickXpath = (xpath) => {
    return findByXpath(xpath).then(el => el.click());
};

const clickText = (text) => {
    return clickXpath(`//*[contains(text(), '${text}')]`);
};

const clickButton = (text) => {
    return clickXpath(`//button[contains(text(), '${text}')]`);
};

const getLogs = (whitelist) => {
    return driver.manage()
        .logs()
        .get('browser')
        .then((entries) => {
            return entries.filter((entry) => {
                const message = entry.message;
                for (let i = 0; i < whitelist.length; i++) {
                    if (message.indexOf(whitelist[i]) !== -1) {
                        // eslint-disable-next-line no-console
                        console.warn('Ignoring whitelisted error: ' + whitelist[i]);
                        return false;
                    } else if (entry.level !== 'SEVERE') {
                        // eslint-disable-next-line no-console
                        console.warn('Ignoring non-SEVERE entry: ' + message);
                        return false;
                    }
                }
                return true;
            });
        });
};

export {
    clickText,
    clickButton,
    clickXpath,
    driver,
    findByXpath,
    getLogs
};
