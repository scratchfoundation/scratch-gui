import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByXpath,
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
        await clickXpath('//*[@aria-label="Tutorials"]');
        await clickText('Getting Started'); // Modal should close
        // Make sure YouTube video on first card appears
        await findByXpath('//div[contains(@class, "step-video")]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // @todo navigating cards, etc.
});
