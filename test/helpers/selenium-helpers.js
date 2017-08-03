/* eslint-env jest */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

const webdriver = require('selenium-webdriver');

const {By, until} = webdriver;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const clickScriptsTab = () => driver.findElement(By.id('react-tabs-0')).click();
const clickCostumeTab = () => driver.findElement(By.id('react-tabs-2')).click();
const clickSoundsTab = () => driver.findElement(By.id('react-tabs-4')).click();

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
                    }
                    return entry.level === 'SEVERE';
                }
            });
        });
};

export {
    getLogs,
    clickText,
    clickButton,
    clickXpath,
    findByXpath,
    clickCostumeTab,
    clickScriptsTab,
    clickSoundsTab,
    driver
};
