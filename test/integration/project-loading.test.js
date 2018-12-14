import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    scope
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

        test('Nonexistent projects show error screen', async () => {
            await loadUri(`${uri}#999999999999999999999`);
            await clickText('Oops! Something went wrong.');
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
            await new Promise(resolve => setTimeout(resolve, 3000));
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

        test('Creating new project resets active tab to Code tab', async () => {
            await loadUri(uri);
            await clickText('View 2.0 Project');
            const inputElement = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            const projectId = '96708228';
            await inputElement.sendKeys(`scratch.mit.edu/projects/${projectId}`);
            await clickXpath('//button[@title="View Project"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await findByXpath('//*[span[text()="Costumes"]]');
            await clickText('Costumes');
            await clickXpath(
                '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
                'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
            );
            await clickXpath('//li[span[text()="New"]]');
            await findByXpath('//*[div[@class="scratchCategoryMenu"]]');
            await clickText('Operators', scope.blocksTab);
        });

        test('Not logged in->made no changes to project->create new project should not show alert', async () => {
            await loadUri(uri);
            await clickText('View 2.0 Project');
            const inputElement = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            const projectId = '96708228';
            await inputElement.sendKeys(`scratch.mit.edu/projects/${projectId}`);
            await clickXpath('//button[@title="View Project"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath(
                '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
                'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
            );
            await clickXpath('//li[span[text()="New"]]');
            await findByXpath('//*[div[@class="scratchCategoryMenu"]]');
            await clickText('Operators', scope.blocksTab);
        });

        test('Not logged in->made a change to project->create new project should show alert', async () => {
            await loadUri(uri);
            await clickText('View 2.0 Project');
            const inputElement = await findByXpath("//input[@placeholder='scratch.mit.edu/projects/123456789']");
            const projectId = '96708228';
            await inputElement.sendKeys(`scratch.mit.edu/projects/${projectId}`);
            await clickXpath('//button[@title="View Project"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickText('move');
            await clickXpath(
                '//div[contains(@class, "menu-bar_menu-bar-item") and ' +
                'contains(@class, "menu-bar_hoverable")][span[text()="File"]]'
            );
            await clickXpath('//li[span[text()="New"]]');
            driver.switchTo()
                .alert()
                .accept();
            await findByXpath('//*[div[@class="scratchCategoryMenu"]]');
            await clickText('Operators', scope.blocksTab);
        });
    });
});
