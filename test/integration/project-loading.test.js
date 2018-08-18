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

describe('Loading scratch gui', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('The "Not Now" button sends you to scratch', async () => {
        await loadUri(uri);
        await clickText('Not Now');
        const currentUrl = await driver.getCurrentUrl();
        await expect(currentUrl).toEqual('https://scratch.mit.edu/');
    });

    describe('Loading projects by ID', () => {

        test('Load 2.0 project using import modal', async () => {
            await loadUri(uri);
            await clickText('View 2.0 Project');
            const el = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            const projectId = '96708228';
            await el.sendKeys(`scratch.mit.edu/projects/${projectId}`);
            await clickXpath('//button[@title="View Project"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Stop"]');
            const logs = await getLogs();
            await expect(logs).toEqual([]);
        });

        test('Invalid url when loading project through modal lets you try again', async () => {
            await loadUri(uri);
            await clickText('View 2.0 Project');
            let el = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            await el.sendKeys('thisisnotaurl');
            await clickXpath('//button[@title="View Project"]');
            el = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            await el.clear();
            await el.sendKeys('scratch.mit.edu/projects/96708228');
            await clickXpath('//button[@title="View Project"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Stop"]');
            const logs = await getLogs();
            await expect(logs).toEqual([]);
        });

        test('Load a project by ID directly through url', async () => {
            await driver.quit(); // Reset driver to test hitting # url directly
            driver = getDriver();

            const projectId = '96708228';
            await loadUri(`${uri}#${projectId}`);
            await clickXpath('//button[@title="Try It"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Stop"]');
            const logs = await getLogs();
            await expect(logs).toEqual([]);
        });

        test('Load a project by ID (fullscreen)', async () => {
            await driver.quit(); // Reset driver to test hitting # url directly
            driver = getDriver();

            const prevSize = driver.manage()
                .window()
                .getSize();
            await new Promise(resolve => setTimeout(resolve, 2000));
            driver.manage()
                .window()
                .setSize(1920, 1080);
            const projectId = '96708228';
            await loadUri(`${uri}#${projectId}`);
            await clickXpath('//button[@title="Try It"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Full Screen Control"]');
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Stop"]');
            prevSize.then(value => {
                driver.manage()
                    .window()
                    .setSize(value.width, value.height);
            });
            const logs = await getLogs();
            await expect(logs).toEqual([]);
        });
    });
});
