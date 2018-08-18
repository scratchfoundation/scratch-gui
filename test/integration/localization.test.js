import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    getDriver,
    getLogs,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Localization', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Localization', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickXpath('//*[@aria-label="language selector"]');
        await clickText('English');
        await clickText('Deutsch');
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks refresh

        // Make sure the blocks are translating
        await clickText('Fühlen'); // Sensing category in German
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks to scroll
        await clickText('Antwort'); // Find the "answer" block in German

        // Change to the costumes tab to confirm other parts of the GUI are translating
        await clickText('Kostüme');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
