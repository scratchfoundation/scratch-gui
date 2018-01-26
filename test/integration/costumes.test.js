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

describe('Working with costumes', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a costume', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Costumes');
        await clickText('Add Costume');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('abb');
        await clickText('Abby-a'); // Should close the modal, then click the costumes in the selector
        await findByXpath("//input[@value='Abby-a']"); // Should show editor for new costume
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a backdrop', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Add Backdrop');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('blue');
        await clickText('Blue Sky'); // Should close the modal
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
