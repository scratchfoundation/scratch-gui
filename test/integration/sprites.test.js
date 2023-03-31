import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    elementIsVisible,
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
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await rightClickText('Sprite1', scope.spriteTile);
        await clickText('delete', scope.spriteTile);
        // Confirm that the stage has been switched to
        await findByText('Stage selected: no motion blocks');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Deleting by x button on sprite tile', async () => {
        await loadUri(uri);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickXpath('//*[@aria-label="Delete"]'); // Only visible close button is on the sprite
        // Confirm that the stage has been switched to
        await findByText('Stage selected: no motion blocks');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sprite by uploading a png', async () => {
        await loadUri(uri);
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
    test('Adding a sprite by uploading an svg (gh-3608)', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/100-100.svg'));
        await clickText('100-100', scope.spriteTile); // Sprite is named for costume filename

        // Check to make sure the size is right
        await clickText('Costumes');
        await clickText('100-100', scope.costumesTab); // The name of the costume
        await clickText('100 x 100', scope.costumesTab); // The size of the costume
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sprite by uploading a gif', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/paddleball.gif'));
        await clickText('paddleball', scope.spriteTile); // Sprite is named for costume filename

        await clickText('Costumes');
        await findByText('paddleball', scope.costumesTab);
        await findByText('paddleball2', scope.costumesTab);
        await findByText('paddleball3', scope.costumesTab);
        await findByText('paddleball4', scope.costumesTab);
        await findByText('paddleball5', scope.costumesTab);
        await findByText('paddleball6', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a letter sprite through the Letters filter in the library', async () => {
        await loadUri(uri);
        await driver.manage()
            .window()
            .setSize(1244, 768); // Letters filter not visible at 1024 width
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        await clickText('Letters');
        await clickText('Block-B', scope.modal); // Closes modal
        await rightClickText('Block-B', scope.spriteTile); // Make sure it is there
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Use browser back button to close library', async () => {
        await driver.get('https://www.google.com');
        await loadUri(uri);
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        const abbyElement = await findByText('Abby'); // Should show editor for new costume
        await elementIsVisible(abbyElement);
        await driver.navigate().back();
        try {
            // should throw error because library is no longer visible
            await elementIsVisible(abbyElement);
            throw 'ShouldNotGetHere'; // eslint-disable-line no-throw-literal
        } catch (e) {
            expect(e.constructor.name).toEqual('StaleElementReferenceError');
        }
        const costumesElement = await findByText('Costumes'); // Should show editor for new costume
        await elementIsVisible(costumesElement);
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding multiple sprites at the same time', async () => {
        const files = [
            path.resolve(__dirname, '../fixtures/gh-3582-png.png'),
            path.resolve(__dirname, '../fixtures/100-100.svg')
        ];
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(files.join('\n'));

        await findByText('gh-3582-png', scope.spriteTile);
        await findByText('100-100', scope.spriteTile);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Load a sprite3 with a missing svg costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-svg.sprite3'));
        const tile = await findByText('Blue Square Guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a sprite3 with a currupt svg costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-svg.sprite3'));
        const tile = await findByText('Blue Square Guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a scratch3 corrupt svg as a sprite', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-from-scratch3.svg'));
        const tile = await findByText('corrupt-from-scratch3', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a sprite2 with a missing svg costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-svg.sprite2'));
        const tile = await findByText('Blue Guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a sprite2 with a currupt svg costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupted-svg.sprite2'));
        const tile = await findByText('Blue Guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a corrupt scratch2 svg as a sprite', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/scratch2-corrupted.svg'));
        const tile = await findByText('scratch2-corrupted', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a sprite3 with a missing bmp costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/missing-bmp.sprite3'));
        const tile = await findByText('green-bmp-guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load a sprite3 with a currupt bmp costume', async () => {
        await loadUri(uri);
        const el = await findByXpath('//button[@aria-label="Choose a Sprite"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-bmp.sprite3'));
        const tile = await findByText('green-bmp-guy', scope.spriteTile);
        const tileVisible = await tile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    // TODO: uploading a corrupt bmp as a sprite should throw an error and not add a gray question mark

});
