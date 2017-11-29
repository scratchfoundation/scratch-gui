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
    rightClickText
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

const errorWhitelist = [
    'The play() request was interrupted by a call to pause()'
];

let driver;

const blocksTabScope = "*[@id='react-tabs-1']";
const costumesTabScope = "*[@id='react-tabs-3']";
const soundsTabScope = "*[@id='react-tabs-5']";
const reportedValueScope = '*[@class="blocklyDropDownContent"]';
const modalScope = '*[@class="ReactModalPortal"]';

describe('costumes, sounds and variables', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Blocks report when clicked in the toolbox', async () => {
        await loadUri(uri);
        await clickText('Blocks');
        await clickText('Operators', blocksTabScope);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('join', blocksTabScope); // Click "join <hello> <world>" block
        await findByText('helloworld', reportedValueScope); // Tooltip with result
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Switching sprites updates the block menus', async () => {
        await loadUri(uri);
        await clickText('Sound', blocksTabScope);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        // "meow" sound block should be visible
        await findByText('meow', blocksTabScope);
        await clickText('Backdrops'); // Switch to the backdrop
        // Now "pop" sound block should be visible and motion blocks hidden
        await findByText('pop', blocksTabScope);
        await clickText('Motion', blocksTabScope);
        await findByText('Stage selected: no motion blocks');

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Adding a costume', async () => {
        await loadUri(uri);
        await clickText('Costumes');
        await clickText('Add Costume');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('abb');
        await clickText('Abby-a'); // Should close the modal, then click the costumes in the selector
        await clickText('costume1', costumesTabScope);
        await clickText('Abby-a', costumesTabScope);
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Adding a sound', async () => {
        await loadUri(uri);
        await clickText('Sounds');

        // Delete the sound
        await rightClickText('meow', soundsTabScope);
        await clickText('delete', soundsTabScope);
        await driver.switchTo().alert()
            .accept();

        // Add a sound
        await clickText('Add Sound');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('chom');
        await clickText('Chomp'); // Should close the modal, then click the sounds in the selector
        await clickText('Chomp', soundsTabScope);
        await clickXpath('//button[@title="Play"]');

        await clickText('Louder');
        await clickText('Softer');
        await clickText('Faster');
        await clickText('Slower');
        await clickText('Robot');
        await clickText('Echo');
        await clickText('Reverse');

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Load a project by ID', async () => {
        const projectId = '96708228';
        await loadUri(`${uri}#${projectId}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Creating variables', async () => {
        await loadUri(uri);
        await clickText('Blocks');
        await clickText('Data', blocksTabScope);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('Create variable...');
        let el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('score');
        await clickButton('OK');
        await clickText('Create variable...');
        el = await findByXpath("//input[@placeholder='']");
        await el.sendKeys('second variable');
        await clickButton('OK');

        // Make sure reporting works on a new variable
        await clickText('Data', blocksTabScope);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('score', blocksTabScope);
        await findByText('0', reportedValueScope); // Tooltip with result

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Importing extensions', async () => {
        await loadUri(uri);
        await clickText('Blocks');
        await clickText('Extensions');
        await clickText('Pen', modalScope); // Modal closes
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('stamp', blocksTabScope); // Click the "stamp" block

        // Make sure trying to load the extension again scrolls back down
        await clickText('Motion', blocksTabScope); // To scroll the list back to the top
        await clickText('Extensions');
        await clickText('Pen', modalScope); // Modal closes
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('stamp', blocksTabScope); // Would fail if didn't scroll back

        // Make sure switching sprites doesn't clear extensions
        await clickText('Backdrops'); // Switch to the backdrop
        await findByText('Pen', blocksTabScope); // Pen extension should still be loaded

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});
