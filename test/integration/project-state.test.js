import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByXpath,
    getDriver,
    Key,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Project state', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('File->New resets project title', async () => {
        const defaultProjectTitle = 'Scratch Project';
        await loadUri(uri);
        const inputEl = await findByXpath(`//input[@value="${defaultProjectTitle}"]`);
        for (let i = 0; i < defaultProjectTitle.length; i++) {
            inputEl.sendKeys(Key.BACK_SPACE);
        }
        inputEl.sendKeys('Changed title of project');
        await clickText('Costumes'); // just to blur the input
        // verify that project title has changed
        await clickXpath('//input[@value="Changed title of project"]');
        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
            'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
        );
        await clickXpath('//li[span[text()="New"]]');
        // project title should be default again
        await clickXpath(`//input[@value="${defaultProjectTitle}"]`);
    });
});
