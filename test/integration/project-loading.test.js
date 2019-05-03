import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const uri = path.resolve(__dirname, '../../build/index.html');

describe('Loading scratch gui', () => {
    describe('Loading projects by ID', () => {

        test('Nonexistent projects show error screen', async () => {
            const {
                clickText,
                getDriver,
                loadUri
            } = new SeleniumHelper();

            const driver = await getDriver();

            await loadUri(`${uri}#999999999999999999999`);
            await clickText('Oops! Something went wrong.');
            await driver.quit();
        });

        test('Load a project by ID directly through url', async () => {
            const {
                clickXpath,
                getDriver,
                getLogs,
                loadUri
            } = new SeleniumHelper();

            const driver = await getDriver();

            const projectId = '96708228';
            await loadUri(`${uri}#${projectId}`);
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickXpath('//img[@title="Stop"]');
            const logs = await getLogs();
            await expect(logs).toEqual([]);
            await driver.quit();
        });

        test('Load a project by ID (fullscreen)', async () => {
            const {
                clickXpath,
                getDriver,
                getLogs,
                loadUri
            } = new SeleniumHelper();

            const driver = await getDriver();

            const prevSize = driver.manage()
                .window()
                .getSize();
            await new Promise(resolve => setTimeout(resolve, 2000));
            driver.manage()
                .window()
                .setSize(1920, 1080);
            const projectId = '96708228';
            await loadUri(`${uri}#${projectId}`);
            await clickXpath('//img[@title="Full Screen Control"]');
            await new Promise(resolve => setTimeout(resolve, 500));
            await clickXpath('//img[@title="Go"]');
            await new Promise(resolve => setTimeout(resolve, 1000));
            await clickXpath('//img[@title="Stop"]');
            prevSize.then(value => {
                driver.manage()
                    .window()
                    .setSize(value.width, value.height);
            });
            const logs = await getLogs();
            await expect(logs).toEqual([]);
            await driver.quit();
        });
    });

    describe('Creating new projects', () => {
        const {
            clickText,
            clickXpath,
            findByXpath,
            getDriver,
            loadUri,
            scope
        } = new SeleniumHelper();

        let driver;

        beforeAll(() => {
            driver = getDriver();
        });

        afterAll(async () => {
            await driver.quit();
        });

        test('Creating new project resets active tab to Code tab', async () => {
            await loadUri(uri);
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
            await new Promise(resolve => setTimeout(resolve, 2000));
            await clickText('Sounds');
            await clickXpath('//button[@aria-label="Choose a Sound"]');
            await clickText('A Bass', scope.modal); // Should close the modal
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
