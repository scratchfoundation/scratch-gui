import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';
import {Key} from 'selenium-webdriver';

const {
    clickText,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    rightClickText,
    scope
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('Working with sounds', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('Adding a sound through the library', async () => {
        await loadUri(uri);
        await clickText('Sounds');

        // Delete the sound
        await rightClickText('Meow', scope.soundsTab);
        await driver.sleep(500); // Wait a moment for context menu; only needed for local testing
        await clickText('delete', scope.soundsTab);

        // Add it back
        await clickXpath('//button[@aria-label="Choose a Sound"]');
        let el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('meow');
        await clickText('Meow', scope.modal); // Should close the modal

        // Add a new sound
        await clickXpath('//button[@aria-label="Choose a Sound"]');
        el = await findByXpath("//input[@placeholder='Search']");
        await el.sendKeys('chom');
        await clickText('Chomp'); // Should close the modal, then click the sounds in the selector
        await findByXpath("//input[@value='Chomp']"); // Should show editor for new sound

        await clickXpath('//button[@title="Play"]');

        await clickText('Louder');
        await clickText('Softer');
        await clickText('Faster');
        await clickText('Slower');
        await clickText('Robot');
        await clickText('Reverse');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sound by surprise button', async () => {
        await loadUri(uri);
        await clickText('Sounds');
        const el = await findByXpath('//button[@aria-label="Choose a Sound"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        await clickXpath('//button[@aria-label="Surprise"]');
        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Duplicating a sound', async () => {
        await loadUri(uri);
        await clickText('Sounds');

        await rightClickText('Meow', scope.soundsTab);
        await clickText('duplicate', scope.soundsTab);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for error

        // Make sure the duplicated sound is named correctly.
        await clickText('Meow2', scope.soundsTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    // Regression test for gui issue #1320
    test('Switching sprites with different numbers of sounds', async () => {
        await loadUri(uri);

        // Add a sound so this sprite has 2 sounds.
        await clickText('Sounds');
        await clickXpath('//button[@aria-label="Choose a Sound"]');
        await clickText('A Bass'); // Closes the modal

        // Now add a sprite with only one sound.
        await clickXpath('//button[@aria-label="Choose a Sprite"]');
        await clickText('Abby'); // Doing this used to crash the editor.

        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for error

        // Make sure the 'Oops' screen is not visible
        const content = await driver.getPageSource();
        expect(content.indexOf('Oops')).toEqual(-1);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding multiple sounds at the same time', async () => {
        const files = [
            path.resolve(__dirname, '../fixtures/movie.wav'),
            path.resolve(__dirname, '../fixtures/sneaker.wav')
        ];
        await loadUri(uri);
        await clickText('Sounds');
        const el = await findByXpath('//button[@aria-label="Choose a Sound"]');
        await driver.actions().mouseMove(el)
            .perform();
        await driver.sleep(500); // Wait for thermometer menu to come up
        const input = await findByXpath('//input[@type="file"]');
        await input.sendKeys(files.join('\n'));

        await findByText('movie', scope.soundsTab);
        await findByText('sneaker', scope.soundsTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Copy to new button adds a new sound', async () => {
        await loadUri(uri);
        await clickText('Sounds');
        await clickText('Copy to New', scope.soundsTab);
        await clickText('Meow2', scope.soundsTab);

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Copy and pasting within a sound changes its duration', async () => {
        await loadUri(uri);
        await clickText('Sounds');
        await findByText('0.85', scope.soundsTab); // Original meow sound duration
        await clickText('Copy', scope.soundsTab);
        await clickText('Paste', scope.soundsTab);
        await findByText('1.70', scope.soundsTab); // Sound has doubled in duration

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Can copy a sound from a sprite and paste into a sound on the stage', async () => {
        await loadUri(uri);
        await clickText('Sounds');
        await clickText('Copy', scope.soundsTab); // Copy the meow sound
        await clickXpath('//span[text()="Stage"]');
        await findByText('0.02', scope.soundsTab); // Original pop sound duration
        await clickText('Paste', scope.soundsTab);
        await findByText('0.87', scope.soundsTab); // Duration of pop + meow sound

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Keyboard shortcuts', async () => {
        const cmdCtrl = process.platform.includes('darwin') ? Key.COMMAND : Key.CONTROL;

        await loadUri(uri);
        await clickText('Sounds');
        const el = await findByXpath('//button[@aria-label="Choose a Sound"]');
        await el.sendKeys(Key.chord(cmdCtrl, 'a')); // Select all
        await findByText('0.85', scope.soundsTab); // Meow sound duration
        await el.sendKeys(Key.DELETE);
        await findByText('0.00', scope.soundsTab); // Sound is now empty
        await el.sendKeys(Key.chord(cmdCtrl, 'z')); // undo
        await findByText('0.85', scope.soundsTab); // Meow sound is back
        await el.sendKeys(Key.chord(cmdCtrl, Key.SHIFT, 'z')); // redo
        await findByText('0.00', scope.soundsTab); // Sound is empty again

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });
});
