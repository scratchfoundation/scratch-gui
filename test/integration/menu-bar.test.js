import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickXpath,
    findByXpath,
    getDriver,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Menu bar settings', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('File->New should be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="New"]] and not(@data-tip="tooltip")]');
    });

    test('File->Upload should be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Upload from your computer"]] and not(@data-tip="tooltip")]');
    });

    test('File->Download should be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Download to your computer"]] and not(@data-tip="tooltip")]');
    });

    test('Share button should NOT be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await findByXpath('//div[span[div[span[text()="Share"]]] and @data-tip="tooltip"]');
    });
});
