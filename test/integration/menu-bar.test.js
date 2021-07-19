import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    loadUri,
    rightClickText,
    scope
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
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="New"]] and not(@data-tip="tooltip")]');
    });

    test('File->Load should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[text()="Load from your computer"] and not(@data-tip="tooltip")]');
    });

    test('File->Save should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await findByXpath('//*[li[span[text()="Save to your computer"]] and not(@data-tip="tooltip")]');
    });

    test('Share button should NOT be enabled', async () => {
        await loadUri(uri);
        await findByXpath('//div[span[div[span[text()="Share"]]] and @data-tip="tooltip"]');
    });

    test('Logo should be clickable', async () => {
        await loadUri(uri);
        await clickXpath('//img[@alt="Scratch"]');
        const currentUrl = await driver.getCurrentUrl();
        await expect(currentUrl).toEqual('https://scratch.mit.edu/');
    });

    test('(GH#4064) Project name should be editable', async () => {
        await loadUri(uri);
        const el = await findByXpath('//input[@value="Scratch Project"]');
        await el.sendKeys(' - Personalized');
        await clickText('Costumes'); // just to blur the input
        await clickXpath('//input[@value="Scratch Project - Personalized"]');
    });

    test('User is not warned before uploading project file over a fresh project', async () => {
        await loadUri(uri);
        await clickText('File');
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        // No replace alert since no changes were made
        await findByText('project1-sprite');
    });

    test('User is warned before uploading project file over an edited project', async () => {
        await loadUri(uri);

        // Change the project by deleting a sprite
        await rightClickText('Sprite1', scope.spriteTile);
        await clickText('delete', scope.spriteTile);

        await clickText('File');
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await driver.switchTo().alert()
            .accept();
        await findByText('project1-sprite');
    });
});
