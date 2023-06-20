import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

const FILE_MENU_XPATH = '//div[contains(@class, "menu-bar_menu-bar-item")]' +
    '[*[contains(@class, "menu-bar_collapsible-label")]//*[text()="File"]]';

describe('Loading scratch gui', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Loading project file from computer succeeds, without opening failure alert', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await findByText('project1-sprite');
        // this test will fail if an alert appears, e.g. in SBFileUploaderHOC's onload() function
    });

    test('Loading project file from computer gives project the filename from file', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await findByText('project1-sprite');
        await clickXpath('//input[@value="project1"]');
    });

    test('Load sb3 project with a missing svg costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-sprite-svg.sb3'));
        const spriteTile = await findByText('Blue Square Guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });

    test('Load sb3 project with an invalid svg costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-svg.sb3'));
        const spriteTile = await findByText('Blue Square Guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });

    test('Load sb2 project with a missing svg costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-svg.sb2'));
        const spriteTile = await findByText('Blue Guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });

    test('Load sb2 project with an invalid svg costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-svg.sb2'));
        const spriteTile = await findByText('Blue Guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });

    test('Load sb3 project with a missing bmp costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-bmp.sb3'));
        const spriteTile = await findByText('green-bmp-guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });

    test('Load sb3 project with an invalid bmp costume', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-bmp.sb3'));
        const spriteTile = await findByText('green-bmp-guy');
        const tileVisible = await spriteTile.isDisplayed();
        expect(tileVisible).toBe(true);
    });
});
