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

describe('Working with the how-to library', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Choosing a how-to', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Costumes');
        await clickXpath('//*[@aria-label="How-to Library"]');
        await clickText('Getting Started'); // Modal should close
        await clickText('Add a Move Block and a Say Block'); // Make sure first card appears
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // @todo navigating cards, etc.
});
