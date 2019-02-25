import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    findByXpath,
    getDriver,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html?tutorial=all');
const uriPrefix = path.resolve(__dirname, '../../build/index.html?tutorial=');

let driver;

describe('Working with shortcut to Tutorials library', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('opens with the Tutorial Library showing', async () => {
        await loadUri(uri);
        // make sure there is a tutorial visible that doesn't have a shortcut
        await clickText('Make It Spin');
        await findByXpath('//div[contains(@class, "step-video")]');
    });

    test('can open hidden tutorials', async () => {
        await loadUri(`${uriPrefix}whatsnew`);
        // should open the tutorial video immediately
        await findByXpath('//div[contains(@class, "step-video")]');
    });
    // @todo navigating cards, etc.
});
