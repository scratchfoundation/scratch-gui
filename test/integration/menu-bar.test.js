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

const FILE_MENU_XPATH = '//div[contains(@class, "menu-bar_menu-bar-item")]' +
    '[*[contains(@class, "menu-bar_collapsible-label")]//*[text()="File"]]';
const SETTINGS_MENU_XPATH = '//div[contains(@class, "menu-bar_menu-bar-item")]' +
    '[*[contains(@class, "settings-menu_dropdown-label")]//*[text()="Settings"]]';

describe('Menu bar settings', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('File->New should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await findByXpath('//*[li[span[text()="New"]] and not(@data-tip="tooltip")]');
    });

    test('File->Load should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
        await findByXpath('//*[li[text()="Load from your computer"] and not(@data-tip="tooltip")]');
    });

    test('File->Save should be enabled', async () => {
        await loadUri(uri);
        await clickXpath(FILE_MENU_XPATH);
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
        await clickXpath(FILE_MENU_XPATH);
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
        await clickText('yes', scope.modal);

        await clickXpath(FILE_MENU_XPATH);
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await driver.switchTo().alert()
            .accept();
        await findByText('project1-sprite');
    });

    test('Theme picker shows themes', async () => {
        await loadUri(uri);
        await clickXpath(SETTINGS_MENU_XPATH);
        await clickText('Color Mode', scope.menuBar);

        expect(await (await findByText('Original', scope.menuBar)).isDisplayed()).toBe(true);
        expect(await (await findByText('High Contrast', scope.menuBar)).isDisplayed()).toBe(true);
    });

    test('Theme picker switches to high contrast', async () => {
        await loadUri(uri);
        await clickXpath(SETTINGS_MENU_XPATH);
        await clickText('Color Mode', scope.menuBar);
        await clickText('High Contrast', scope.menuBar);

        // There is a tiny delay for the color theme to be applied to the categories.
        await driver.wait(async () => {
            const motionCategoryDiv = await findByXpath(
                '//div[contains(@class, "scratchCategoryMenuItem") and ' +
                'contains(@class, "scratchCategoryId-motion")]/*[1]');
            const color = await motionCategoryDiv.getCssValue('background-color');

            // Documentation for getCssValue says it depends on how the browser
            // returns the value. Locally I am seeing 'rgba(128, 181, 255, 1)',
            // but this is a bit flexible just in case.
            return /128,\s?181,\s?255/.test(color) || color.includes('80B5FF');
        }, 5000, 'Motion category color does not match high contrast theme');
    });

    test('Settings menu switches between submenus', async () => {
        await loadUri(uri);
        await clickXpath(SETTINGS_MENU_XPATH);

        // Language and theme options not visible yet
        expect(await (await findByText('High Contrast', scope.menuBar)).isDisplayed()).toBe(false);
        expect(await (await findByText('Esperanto', scope.menuBar)).isDisplayed()).toBe(false);

        await clickText('Color Mode', scope.menuBar);

        // Only theme options visible
        expect(await (await findByText('High Contrast', scope.menuBar)).isDisplayed()).toBe(true);
        expect(await (await findByText('Esperanto', scope.menuBar)).isDisplayed()).toBe(false);

        await clickText('Language', scope.menuBar);

        // Only language options visible
        expect(await (await findByText('High Contrast', scope.menuBar)).isDisplayed()).toBe(false);
        expect(await (await findByText('Esperanto', scope.menuBar)).isDisplayed()).toBe(true);
    });

    test('Menu labels hidden when width is equal to 1024', async () => {
        await loadUri(uri);
        await driver.manage()
            .window()
            .setSize(1024, 768);

        const collapsibleMenus = ['Settings', 'File', 'Edit', 'Tutorials'];
        for (const menu of collapsibleMenus) {
            const settingsMenu = await findByText(menu, scope.menuBar);
            expect(await settingsMenu.isDisplayed()).toBe(false);
        }
    });

    test('Menu labels shown when width is greater than 1024', async () => {
        await loadUri(uri);
        await driver.manage()
            .window()
            .setSize(1200, 768);

        const collapsibleMenus = ['Settings', 'File', 'Edit', 'Tutorials'];
        for (const menu of collapsibleMenus) {
            const settingsMenu = await findByText(menu, scope.menuBar);
            expect(await settingsMenu.isDisplayed()).toBe(true);
        }
    });
});
