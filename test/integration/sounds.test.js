import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    clickText,
    clickXpath,
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
        await clickXpath('//button[@title="Try It"]');
        await clickText('Sounds');

        // Delete the sound
        await rightClickText('Meow', scope.soundsTab);
        await clickText('delete', scope.soundsTab);
        await driver.switchTo().alert()
            .accept();

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
        await clickText('Echo');
        await clickText('Reverse');

        const logs = await getLogs();
        await expect(logs).toEqual([]);
    });

    test('Adding a sound by surprise button', async () => {
        await loadUri(uri);
        await clickXpath('//button[@title="Try It"]');
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
        await clickXpath('//button[@title="Try It"]');
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
        await clickXpath('//button[@title="Try It"]');

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
});
