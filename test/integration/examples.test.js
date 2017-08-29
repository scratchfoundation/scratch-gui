/* globals Promise */

import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickButton,
    clickText,
    clickXpath,
    findByXpath,
    getDriver,
    getLogs
} = new SeleniumHelper();

const errorWhitelist = [
    'The play() request was interrupted by a call to pause()'
];

let driver;

describe('player example', () => {
    const uri = path.resolve(__dirname, '../../build/player.html');

    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Load a project by ID', async () => {
        const projectId = '96708228';
        await driver.get(`file://${uri}#${projectId}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});

describe('blocks example', () => {
    const uri = path.resolve(__dirname, '../../build/blocks-only.html');

    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Load a project by ID', async () => {
        const projectId = '96708228';
        await driver.get(`file://${uri}#${projectId}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Change categories', async () => {
        await driver.get(`file://${uri}`);
        await clickText('Looks');
        await clickText('Sound');
        await clickText('Pen');
        await clickText('Events');
        await clickText('Control');
        await clickText('Sensing');
        await clickText('Operators');
        await clickText('Data');
        await clickText('Create variable...');
        let el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('score');
        await clickButton('OK');
        await clickText('Create variable...');
        el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('second variable');
        await clickButton('OK');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});
