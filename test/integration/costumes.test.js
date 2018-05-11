import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
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
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
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
        await clickXpath('//button[@title="tryit"]');
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
        await clickXpath('//button[@title="tryit"]');
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
        await clickXpath('//button[@title="tryit"]');
        await clickText('Costumes');

        await rightClickText('costume1', scope.costumesTab);
        await clickText('duplicate', scope.costumesTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for duplication to finish

        // Make sure the duplicated costume is named correctly.
        await clickText('costume3', scope.costumesTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a backdrop', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickXpath('//button[@aria-label="Choose a Backdrop"]');
        const el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('blue');
        await clickText('Blue Sky'); // Should close the modal
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Converting bitmap/vector in paint editor', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
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
        await clickXpath('//button[@title="tryit"]');
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
});
