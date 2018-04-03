import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickButton,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with the blocks', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Blocks report when clicked in the toolbox', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Code');
        await clickText('Operators', scope.blocksTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('join', scope.blocksTab); // Click "join <hello> <world>" block
        await findByText('helloworld', scope.reportedValue); // Tooltip with result
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Switching sprites updates the block menus', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Sound', scope.blocksTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        // "Meow" sound block should be visible
        await findByText('Meow', scope.blocksTab);
        await clickText('Backdrops'); // Switch to the backdrop
        // Now "pop" sound block should be visible and motion blocks hidden
        await findByText('pop', scope.blocksTab);
        await clickText('Motion', scope.blocksTab);
        await findByText('Stage selected: no motion blocks');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Creating variables', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('Code');
        await clickText('Variables', scope.blocksTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation

        // Expect a default variable "my variable" to be visible
        await clickText('my\u00A0variable', scope.blocksTab);
        await findByText('0', scope.reportedValue);

        await clickText('Make a Variable');
        let el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('score');
        await clickButton('OK');
        await clickText('Make a Variable');
        el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('second variable');
        await clickButton('OK');

        // Make sure reporting works on a new variable
        await clickText('Variables', scope.blocksTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('score', scope.blocksTab);
        await findByText('0', scope.reportedValue); // Tooltip with result

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Custom procedures', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="tryit"]');
        await clickText('My Blocks');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('Make a Block');
        // Click on the "add an input" buttons
        await clickText('number or text', scope.modal);
        await clickText('boolean', scope.modal);
        await clickText('Add a label', scope.modal);
        await clickText('OK', scope.modal);

        // Make sure a "define" block has been added to the workspace
        await findByText('define', scope.blocksTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
