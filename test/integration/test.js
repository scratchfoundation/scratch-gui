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
        // "Meow" sound block should be visible
        await findByText('Meow', blocksTabScope);
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
        await findByXpath("//input[@value='Abby-a']"); // Should show editor for new costume
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Adding a backdrop', async () => {
        await loadUri(uri);
        await clickText('Add Backdrop');
        const el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('blue');
        await clickText('Blue Sky'); // Should close the modal
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Adding a sound', async () => {
        await loadUri(uri);
        await clickText('Sounds');

        // Delete the sound
        await rightClickText('Meow', soundsTabScope);
        await clickText('delete', soundsTabScope);
        await driver.switchTo().alert()
            .accept();

        // Add it back
        await clickText('Add Sound');
        let el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('meow');
        await clickText('Meow', modalScope); // Should close the modal

        // Add a new sound
        await clickText('Add Sound');
        el = await findByXpath("//input[@placeholder='what are you looking for?']");
        await el.sendKeys('chom');
        await clickText('Chomp'); // Should close the modal, then click the sounds in the selector
        await findByXpath("//input[@value='Chomp']"); // Should show editor for new sound

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
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Zoom Control"]');
        await clickXpath('//img[@title="Go"]');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await clickXpath('//img[@title="Stop"]');
        prevSize.then(value => {
            driver.manage()
                .window()
                .setSize(value.width, value.height);
        });
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

    test('Deleting only sprite does not crash', async () => {
        const spriteTileContext = '*[starts-with(@class,"react-contextmenu-wrapper")]';
        await loadUri(uri);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await rightClickText('Sprite1', spriteTileContext);
        await clickText('delete', spriteTileContext);
        await driver.switchTo().alert()
            .accept();
        // Confirm that the stage has been switched to
        await findByText('Stage selected: no motion blocks');
        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Custom procedures', async () => {
        await loadUri(uri);
        await clickText('More');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('Make a Block...');
        // Click on the "add an input" buttons
        await clickText('number or text', modalScope);
        await clickText('boolean', modalScope);
        await clickText('Add a label', modalScope);
        await clickText('OK', modalScope);

        // Make sure a "define" block has been added to the workspace
        await findByText('define', blocksTabScope);

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });

    test('Localization', async () => {
        await loadUri(uri);
        await clickText('Blocks');
        await clickText('Extensions');
        await clickText('Pen', modalScope); // Modal closes
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scroll animation
        await clickText('English');
        await clickText('Deutsch');
        await new Promise(resolve => setTimeout(resolve, 1000)); // wait for blocks refresh
        await clickText('Pen'); // will need to be updated when 'Pen' is translated

        // Make sure "Add Sprite" has changed to "Figur hinzufügen"
        await findByText('Figur hinzufügen');
        // Find the stamp block in German
        await findByText('Abdruck');

        const logs = await getLogs(errorWhitelist);
        await expect(logs).toEqual([]);
    });
});
