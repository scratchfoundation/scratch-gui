import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    getDriver,
    getLogs,
    loadUri,
    rightClickText,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with sprites', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Deleting only sprite does not crash', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await rightClickText('Sprite1', scope.spriteTile);
        await clickText('delete', scope.spriteTile);
        await driver.switchTo().alert()
            .accept();
        // Confirm that the stage has been switched to
        await findByText('Stage selected: no motion blocks');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
