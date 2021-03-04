import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    loadUri
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

    test('Loading project file from computer succeeds, without opening failure alert', async () => {
        await loadUri(uri);
        await clickText('File');
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await findByText('project1-sprite');
        // this test will fail if an alert appears, e.g. in SBFileUploaderHOC's onload() function
    });

    test('Loading project file from computer gives project the filename from file', async () => {
        await loadUri(uri);
        await clickText('File');
        await clickText('Load from your computer');
        const input = await findByXpath('//input[@accept=".sb,.sb2,.sb3"]');
        await input.sendKeys(path.resolve(__dirname, '../fixtures/project1.sb3'));
        await findByText('project1-sprite');
        await clickXpath('//input[@value="project1"]');
    });
});
