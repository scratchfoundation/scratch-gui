import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    getDriver,
    getLogs,
    loadUri,
    scope,
    rightClickText
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

    test('Switching languages', async () => {
        await driver.quit();
        driver = getDriver();
        await loadUri(uri);

        // Add a sprite to make sure it stays when switching languages
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        await clickText('Apple', scope.modal); // Closes modal

        await clickText('Code');
        await clickXpath('//*[@aria-label="language selector"]');
        await clickText('Deutsch');
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks refresh

        // Make sure the blocks are translating
        await clickText('Fühlen'); // Sensing category in German
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks to scroll
        await clickText('Antwort'); // Find the "answer" block in German

        // Change to the costumes tab to confirm other parts of the GUI are translating
        await clickText('Kostüme');

        // After switching languages, make sure Apple sprite still exists
        await rightClickText('Apple', scope.spriteTile); // Make sure it is there

        // Remounting re-attaches the beforeunload callback. Make sure to remove it
        driver.executeScript('window.onbeforeunload = undefined;');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // Regression test for #4476, blocks in wrong language when loaded with locale
    test('Loading with locale shows correct blocks', async () => {
        await loadUri(`${uri}?locale=de`);
        await clickText('Fühlen'); // Sensing category in German
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks to scroll
        await clickText('Antwort'); // Find the "answer" block in German
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
