/* eslint-env jest */
import path from 'path';
import {
    clickText,
    clickButton,
    clickXpath,
    driver,
    findByXpath,
    getLogs
} from '../helpers/selenium-helpers';

const uri = path.resolve(__dirname, '../../build/index.html');

const errorWhitelist = [
    'The play() request was interrupted by a call to pause()'
];

describe('costumes, sounds and variables', () => {
    afterAll(() => {
        return driver.quit();
    });

    test('Adding a costume', () => {
        return driver.get('file://' + uri)
        .then(() => clickText('Costumes'))
        .then(() => clickText('Add Costume'))
        .then(() => findByXpath("//input[@placeholder='what are you looking for?']"))
        .then((el) => el.sendKeys('abb'))
        .then(() => clickText('abby-a')) // Should close the modal, then click the costumes in the selector
        .then(() => clickText('costume1'))
        .then(() => clickText('abby-a'))
        .then(() => getLogs(errorWhitelist))
        .then(logs => expect(logs).toEqual([]));
    });

    test('Adding a sound', () => {
        return driver.get('file://' + uri)
        .then(() => clickText('Sounds'))
        .then(() => clickText('Add Sound'))
        .then(() => findByXpath("//input[@placeholder='what are you looking for?']"))
        .then((el) => el.sendKeys('chom'))
        .then(() => clickText('chomp')) // Should close the modal, then click the sounds in the selector
        .then(() => clickText('meow'))
        .then(() => clickText('chomp'))
        .then(() => clickXpath('//button[@title="Play"]'))
        .then(() => clickText('meow'))
        .then(() => clickXpath('//button[@title="Play"]'))

        .then(() => clickText('Louder'))
        .then(() => clickText('Softer'))
        .then(() => clickText('Faster'))
        .then(() => clickText('Slower'))
        .then(() => clickText('Robot'))
        .then(() => clickText('Echo'))
        .then(() => clickText('Reverse'))

        .then(() => getLogs(errorWhitelist))
        .then(logs => expect(logs).toEqual([]));
    });

    test('Load a project by ID', () => {
        // @todo choose a more interesting project?
        const projectId = '168754184';
        return driver.get('file://' + uri + '#' + projectId)
        .then(() => clickXpath('//img[@title="Go"]'))
        .then(() => clickXpath('//img[@title="Stop"]'))
        .then(() => getLogs(errorWhitelist))
        .then(logs => expect(logs).toEqual([]));
    });

    test('Creating a variable', () => {
        return driver.get('file://' + uri)
        .then(() => clickText('Blocks'))
        .then(() => clickText('Data'))
        .then(() => clickText('Create variable...'))
        .then(() => findByXpath("//input[@placeholder='']"))
        .then((el) => el.sendKeys('score'))
        .then(() => clickButton('OK'))
        .then(() => getLogs(errorWhitelist))
        .then(logs => expect(logs).toEqual([]));
    });
});
