import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    rightClickText,
    getDriver,
    getLogs,
    loadUri,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Loading scratch gui', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Switching small/large stage after highlighting and deleting sprite', async () => {
        await loadUri(uri);

        await new Promise((r) => setTimeout(r, 500)); // wait for animation


        // Delete it
        await rightClickText('Sprite1', scope.spriteTile);
        
        await clickText('delete', scope.spriteTile);
        await clickText('yes', scope.modal);

        // Go to small stage mode
        await clickXpath('//button[@title="Switch to small stage"]');

        // Confirm app still working
        await clickXpath('//button[@title="Switch to large stage"]');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
