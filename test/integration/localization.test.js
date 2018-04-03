import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    getDriver,
    getLogs,
    loadUri,
    scope
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

    // Skipped temporarily while the language selector is marked as
    // "Coming Soon"
    test.skip('Localization', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Code');
        await clickXpath('//button[@title="Add Extension"]');
        await clickText('Pen', scope.modal); // Modal closes
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('English');
        await clickText('Deutsch');
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks refresh
        await clickText('Pen'); // will need to be updated when 'Pen' is translated

        // Make sure "Add Sprite" has changed to "Figur hinzufügen"
        await findByText('Figur hinzufügen');
        // Find the stamp block in German
        await findByText('Abdruck');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
