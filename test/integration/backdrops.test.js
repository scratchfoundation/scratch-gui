import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
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
        await clickXpath('//button[@title="Try It"]');

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
});
