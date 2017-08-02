/* eslint-env jest */
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // eslint-disable-line no-undef

const path = require('path');
const webdriver = require('selenium-webdriver');
const {By, until} = webdriver;

const uri = path.resolve(__dirname, '../../build/index.html');

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

describe('costumes, sounds and variables', () => {
    afterAll(() => {
        return driver.quit();
    });

    test('Adding a costume', () => {
        return driver.get('file://' + uri)

        .then(() => clickCostumeTab())
        .then(() => clickText('Add Costume'))
        .then(() => findByXpath("//input[@placeholder='what are you looking for?']"))
        .then((el) => el.sendKeys('abb'))
        .then(() => clickText('abby-a')) // Should close the modal, then click the costumes in the selector
        .then(() => clickText('costume1'))
        .then(() => clickText('abby-a'))
        .then(() => expect(true).toEqual(true))
        .then(() => driver.manage().logs().get('browser')) // eslint-disable-line newline-per-chained-call
        .then(logs => expect(logs).toEqual([]));
    });

    test('Adding a sound', () => {
        return driver.get('file://' + uri)

        .then(() => clickSoundsTab())
        .then(() => clickText('Add Sound'))
        .then(() => findByXpath("//input[@placeholder='what are you looking for?']"))
        .then((el) => el.sendKeys('chom'))
        .then(() => clickText('chomp')) // Should close the modal, then click the sounds in the selector
        .then(() => clickText('meow'))
        .then(() => clickText('chomp'))

        .then(() => driver.manage().logs().get('browser')) // eslint-disable-line newline-per-chained-call
        .then(logs => expect(logs).toEqual([]));
    });

    test('Creating a variable', () => {
        return driver.get('file://' + uri)

        .then(() => clickScriptsTab())
        .then(() => clickText('Data'))
        .then(() => clickText('Create variable...'))
        .then(() => findByXpath("//input[@placeholder='']"))
        .then((el) => el.sendKeys('score'))
        .then(() => clickButton('OK'))

        .then(() => driver.manage().logs().get('browser')) // eslint-disable-line newline-per-chained-call
        .then(logs => expect(logs).toEqual([]));
    });

    test('Load a project by ID', () => {
        return driver.get('file://' + uri + '#168754184')
        .then(() => driver.manage().logs().get('browser')) // eslint-disable-line newline-per-chained-call
        .then(logs => expect(logs).toEqual([]));
    });
});
