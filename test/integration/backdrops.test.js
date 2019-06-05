import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with backdrops', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a backdrop from the library should not switch to stage', async () => {
        await loadUri(uri);

        // Start on the sounds tab of sprite1 to test switching behavior
        await clickText('Sounds');

        // Add a backdrop without selecting the stage first to test switching
        await clickXpath('//button[@aria-label="Choose a Backdrop"]');
        const el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('blue');
        await clickText('Blue Sky'); // Adds the backdrop

        // Make sure the sprite is still selected, and that the tab has not changed
        await clickText('Meow', scope.soundsTab);

        // Make sure the backdrop was actually added by going to the backdrops tab
        await clickXpath('//span[text()="Stage"]');
        await clickText('Backdrops');
        await clickText('Blue Sky', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding backdrop via paint should switch to stage', async () => {
        await loadUri(uri);

        const buttonXpath = '//button[@aria-label="Choose a Backdrop"]';
        const paintXpath = `${buttonXpath}/following-sibling::div//button[@aria-label="Paint"]`;

        const el = await findByXpath(buttonXpath);
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath(paintXpath);

        // Stage should become selected and costume tab activated
        await findByText('backdrop2', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding backdrop via surprise should not switch to stage', async () => {
        await loadUri(uri);

        // Start on the sounds tab of sprite1 to test switching behavior
        await clickText('Sounds');

        const buttonXpath = '//button[@aria-label="Choose a Backdrop"]';
        const surpriseXpath = `${buttonXpath}/following-sibling::div//button[@aria-label="Surprise"]`;

        const el = await findByXpath(buttonXpath);
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath(surpriseXpath);

        // Make sure the sprite is still selected, and that the tab has not changed
        await clickText('Meow', scope.soundsTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding multiple backdrops from file should switch to stage', async () => {
        const files = [
            path.resolve(__dirname, '../fixtures/gh-3582-png.png'),
            path.resolve(__dirname, '../fixtures/100-100.svg')
        ];
        await loadUri(uri);

        const buttonXpath = '//button[@aria-label="Choose a Backdrop"]';
        const fileXpath = `${buttonXpath}/following-sibling::div//input[@type="file"]`;

        const el = await findByXpath(buttonXpath);
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath(fileXpath);
        await input.sendKeys(files.join('\n'));

        // Should have been switched to stage/costume tab already
        await findByText('gh-3582-png', scope.costumesTab);
        await findByText('100-100', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
