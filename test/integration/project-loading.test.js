import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickXpath,
    getDriver,
    getLogs,
    loadUri
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Loading projects by ID', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Load a project by ID', async () => {
        const projectId = '96708228';
        await loadUri(`${uri}#${projectId}`);
        await clickXpath('//button[@title="tryit"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Load a project by ID (fullscreen)', async () => {
        const prevSize = driver.manage()
            .window()
            .getSize();
        await new Promise(resolve => setTimeout(resolve, 2000));
        driver.manage()
            .window()
            .setSize(1920, 1080);
        const projectId = '96708228';
        await loadUri(`${uri}#${projectId}`);
        await clickXpath('//button[@title="tryit"]');
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
