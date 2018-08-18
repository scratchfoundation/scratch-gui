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

    test('Adding a sprite through the library', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        await clickText('Apple', scope.modal); // Closes modal
        await rightClickText('Apple', scope.spriteTile); // Make sure it is there
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sprite by surprise button', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath('//button[@aria-label="Surprise"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Deleting only sprite does not crash', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
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
