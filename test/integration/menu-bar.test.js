import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
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

    test('File->Load should be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Load from your computer"]] and not(@data-tip="tooltip")]');
    });

    test('File->Save should be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Save to your computer"]] and not(@data-tip="tooltip")]');
    });

    test('Share button should NOT be enabled', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await findByXpath('//div[span[div[span[text()="Share"]]] and @data-tip="tooltip"]');
    });

    test('Logo should be clickable', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath('//img[@alt="Scratch"]');
        const currentUrl = await driver.getCurrentUrl();
        await expect(currentUrl).toEqual('https://scratch.mit.edu/');
    });

    test('(GH#4064) Project name should be editable', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        const el = await findByXpath('//input[@value="Scratch Project"]');
        await el.sendKeys(' - Personalized');
        await clickText('Costumes'); // just to blur the input
        await clickXpath('//input[@value="Scratch Project - Personalized"]');
    });
});
