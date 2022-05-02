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

describe('Working with costumes', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a costume through the library', async () => {
        // This is needed when running the tests all at once or it just fails...
        await driver.quit();
        driver = getDriver();

        await loadUri(uri);
        await driver.sleep(500);
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Costume"]');
        const el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('abb');
        await clickText('Abby-a'); // Should close the modal, then click the costumes in the selector
        await findByXpath("//input[@value='Abby-a']"); // Should show editor for new costume
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a costume by surprise button', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath('//button[@aria-label="Surprise"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a costume by paint button', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath('//button[@aria-label="Paint"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Duplicating a costume', async () => {
        await loadUri(uri);
        await clickText('Costumes');

        await rightClickText('costume1', scope.costumesTab);
        await clickText('duplicate', scope.costumesTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for duplication to finish

        // Make sure the duplicated costume is named correctly.
        await clickText('costume3', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Converting bitmap/vector in paint editor', async () => {
        await loadUri(uri);
        await clickText('Costumes');

        // Convert the first costume to bitmap.
        await clickText('costume1', scope.costumesTab);
        await clickText('Convert to Bitmap', scope.costumesTab);

        // Make sure mode switches back to vector for vector costume.
        await clickText('costume2', scope.costumesTab);
        await clickText('Convert to Bitmap', scope.costumesTab);

        // Make sure bitmap is saved by switching back and converting to vector.
        await clickText('Sounds');
        await clickText('Costumes');
        await clickText('Convert to Vector', scope.costumesTab); // costume2
        await clickText('costume1', scope.costumesTab);
        await clickText('Convert to Vector', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Undo/redo in the paint editor', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        await clickText('costume1', scope.costumesTab);
        await clickText('Convert to Bitmap', scope.costumesTab);
        await clickXpath('//img[@alt="Undo"]');
        await clickText('Convert to Bitmap', scope.costumesTab);
        await clickXpath('//img[@alt="Undo"]');
        await clickXpath('//img[@alt="Redo"]');
        await clickText('Convert to Vector', scope.costumesTab);
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding an svg from file', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/100-100.svg'));
        await clickText('100-100', scope.costumesTab); // Name from filename
        await clickText('100 x 100', scope.costumesTab); // Size is right
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a png from file (gh-3582)', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/gh-3582-png.png'));
        await clickText('gh-3582-png', scope.costumesTab);
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a bmp from file', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/bmpfile.bmp'));
        await clickText('bmpfile', scope.costumesTab);
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding several costumes with a gif', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/paddleball.gif'));

        await findByText('paddleball', scope.costumesTab);
        await findByText('paddleball2', scope.costumesTab);
        await findByText('paddleball3', scope.costumesTab);
        await findByText('paddleball4', scope.costumesTab);
        await findByText('paddleball5', scope.costumesTab);
        await findByText('paddleball6', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a letter costume through the Letters filter in the library', async () => {
        await loadUri(uri);
        await driver.manage()
            .window()
            .setSize(1244, 768); // Letters filter not visible at 1024 width
        await clickText('Costumes');
        await clickXpath('//button[@aria-label="Choose a Costume"]');
        await clickText('Letters');
        await clickText('Block-a', scope.modal); // Closes modal
        await rightClickText('Block-a', scope.costumesTab); // Make sure it is there
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Costumes animate on mouseover', async () => {
        await loadUri(uri);
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        const searchElement = await findByXpath("//input[@placeholder='Search']");
        await searchElement.sendKeys('abb');
        const abbyElement = await findByXpath('//*[span[text()="Abby"]]');
        driver.actions()
            .mouseMove(abbyElement)
            .perform();
        // wait for one of Abby's alternate costumes to appear
        await findByXpath('//img[@src="https://cdn.assets.scratch.mit.edu/internalapi/asset/45de34b47a2ce22f6f5d28bb35a44ff5.svg/get/"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding multiple costumes at the same time', async () => {
        const files = [
            path.resolve(__dirname, '../fixtures/gh-3582-png.png'),
            path.resolve(__dirname, '../fixtures/100-100.svg')
        ];
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(files.join('\n'));

        await findByText('gh-3582-png', scope.costumesTab);
        await findByText('100-100', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Load an invalid svg from scratch3 as costume', async () => { // eslint-disable-line no-disabled-tests
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/corrupt-from-scratch3.svg'));
        const costumeTile = await findByText('corrupt-from-scratch3', scope.costumesTab); // Name from filename
        const tileVisible = await costumeTile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });

    test('Load an invalid svg from scratch2 as costume', async () => { // eslint-disable-line no-disabled-tests
        await loadUri(uri);
        await clickText('Costumes');
        const el = await findByXpath('//button[@aria-label="Choose a Costume"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/scratch2-corrupted.svg'));
        const costumeTile = await findByText('scratch2-corrupted', scope.costumesTab); // Name from filename
        const tileVisible = await costumeTile.isDisplayed();
        await expect(tileVisible).toBe(true);
    });
});
