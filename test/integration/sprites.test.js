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
        await clickText('Motion'); // Make sure we are back to the code tab
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

    test('Adding a sprite by paint button', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath('//button[@aria-label="Paint"]');
        await findByText('Convert to Bitmap'); // Make sure we are on the paint editor
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Deleting only sprite does not crash', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await rightClickText('Sprite1', scope.spriteTile);
        await clickText('delete', scope.spriteTile);
        // Confirm that the stage has been switched to
        await findByText('Stage selected: no motion blocks');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sprite by uploading a png', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/gh-3582-png.png'));
        await clickText('gh-3582-png', scope.spriteTile);
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // This test fails because uploading an SVG as a sprite changes the scaling
    // Enable when this is fixed issues/3608
    test.skip('Adding a sprite by uploading an svg (gh-3608)', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/100-100.svg'));
        await clickText('100-100', scope.spriteTile); // Sprite is named for costume filename

        // Check to make sure the size is right
        await clickText('Costumes');
        await clickText('100-100-costume1', scope.costumesTab); // The name of the costume
        await clickText('100 x 100', scope.costumesTab); // The size of the costume
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
