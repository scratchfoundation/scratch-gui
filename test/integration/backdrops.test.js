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

    test('Adding a backdrop from the library', async () => {
        await loadUri(uri);

        // Start on the sounds tab of sprite1 to test switching behavior
        await clickText('Sounds');

        // Add a backdrop without selecting the stage first to test switching
        await clickXpath('//button[@aria-label="Choose a Backdrop"]');
        const el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('blue');
        await clickText('Blue Sky'); // Adds the backdrop

        // Make sure the stage is selected and the sound tab remains selected.
        // This is different from Scratch2 which selected backdrop tab automatically
        // See issue #3500
        await clickText('pop', scope.soundsTab);

        // Make sure the backdrop was actually added by going to the backdrops tab
        await clickText('Backdrops');
        await clickText('Blue Sky', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding multiple backdrops at the same time', async () => {
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

        await clickXpath('//span[text()="Stage"]');
        await findByText('gh-3582-png', scope.costumesTab);
        await findByText('100-100', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
