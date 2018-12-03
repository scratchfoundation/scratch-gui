import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const {
    /* eslint-disable no-unused-vars */
    clickText,
    clickButton,
    clickXpath,
    findByText,
    findByXpath,
    getDriver,
    getLogs,
    loadUri,
    rightClickText,
    takeScreenshot,
    scope
    /* eslint-enable no-unused-vars */
} = new SeleniumHelper();

const uri = path.resolve(__dirname, '../../build/index.html');

let driver;

describe('convert Code from Ruby', () => {
    beforeAll(() => {
        driver = getDriver();
    });

    afterAll(async () => {
        await driver.quit();
    });

    const setRubyCode = function (code) {
        code = code.replace(/\n/g, '\\n');
        return driver.executeScript(`ace.edit('ruby-editor').setValue('${code}');`);
    };

    const getRubyCode = function () {
        return driver.executeScript(`return ace.edit('ruby-editor').getValue();`);
    };

    test('Code from Ruby -> Ruby from Code', async () => {
        await loadUri(uri);

        await clickText('Ruby', '*[@role="tab"]');
        await setRubyCode('move(\\n10\\n)\\n');

        await clickText('Code', '*[@role="tab"]');

        await clickXpath(
            '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                '/*/span[text()="Edit"]'
        );
        await clickText('Generate Ruby from Code');

        await clickText('Ruby', '*[@role="tab"]');

        expect(await getRubyCode()).toEqual('move(10)\n');
    });

    describe('syntax error', () => {
        beforeEach(async () => {
            await loadUri(uri);
            await clickText('Ruby', '*[@role="tab"]');
            await setRubyCode('move(10)');
            await clickText('Code', '*[@role="tab"]');
            await clickText('Ruby', '*[@role="tab"]');
            await setRubyCode('move(10');
        });

        test('clicked Code', async () => {
            await clickText('Code', '*[@role="tab"]');

            await findByXpath('//li[contains(@id, "react-tabs-") and @aria-selected="false"]/span[text()="Code"]');
            await findByXpath('//li[contains(@id, "react-tabs-") and @aria-selected="true"]/span[text()="Ruby"]');
            await findByXpath(
                '//*[contains(@class, "alert_alert-message")]/' +
                    'span[text()="Could not convert Ruby to Code. Please fix Ruby!"]'
            );
            await findByXpath(
                '//*[contains(@class, "ace_gutter-cell") and contains(@class, "ace_error") and text()="1"]'
            );
        });

        test('clicked Go', async () => {
            await clickXpath('//img[@title="Go"]');

            await findByXpath(
                '//*[contains(@class, "alert_alert-message")]/' +
                    'span[text()="Could not convert Ruby to Code. Please fix Ruby!"]'
            );
            await findByXpath(
                '//*[contains(@class, "ace_gutter-cell") and contains(@class, "ace_error") and text()="1"]'
            );
        });

        test('clicked "Download to your computer" menu', async () => {
            await clickXpath(
                '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                    '/span[text()="File"]'
            );
            await clickText('Save to your computer');

            await findByXpath(
                '//*[contains(@class, "alert_alert-message")]/' +
                    'span[text()="Could not convert Ruby to Code. Please fix Ruby!"]'
            );
            await findByXpath(
                '//*[contains(@class, "ace_gutter-cell") and contains(@class, "ace_error") and text()="1"]'
            );
        });

        test('changed sprite', async () => {
            await clickXpath('//button[@aria-label="Choose a Sprite"]');
            await clickText('Apple', scope.modal);

            await findByXpath(
                '//*[contains(@class, "sprite-selector-item_sprite-selector-item") and ' +
                    'contains(@class, "sprite-selector-item_is-selected")]/*/' +
                    '*[contains(@class, "sprite-selector-item_sprite-name") and text()="Sprite1"]'
            );
            await findByXpath(
                '//*[contains(@class, "sprite-selector-item_sprite-selector-item") and ' +
                    'not(contains(@class, "sprite-selector-item_is-selected"))]/*/' +
                    '*[contains(@class, "sprite-selector-item_sprite-name") and text()="Apple"]'
            );
            await findByXpath(
                '//*[contains(@class, "alert_alert-message")]/' +
                    'span[text()="Could not convert Ruby to Code. Please fix Ruby!"]'
            );
            await findByXpath(
                '//*[contains(@class, "ace_gutter-cell") and contains(@class, "ace_error") and text()="1"]'
            );
        });

        test('recover with "Generate Ruby from Code" menu', async () => {
            await clickText('Code', '*[@role="tab"]');

            await findByXpath(
                '//*[contains(@class, "alert_alert-message")]/' +
                    'span[text()="Could not convert Ruby to Code. Please fix Ruby!"]'
            );
            await clickXpath('//div[contains(@class, "alert_alert-close-button")]');

            await clickXpath(
                '//div[contains(@class, "menu-bar_menu-bar-item") and contains(@class, "menu-bar_hoverable")]' +
                    '/*/span[text()="Edit"]'
            );
            await clickText('Generate Ruby from Code');

            expect(await getRubyCode()).toEqual('move(10)\n');

            await clickText('Code', '*[@role="tab"]');
            await findByXpath('//li[contains(@id, "react-tabs-") and @aria-selected="true"]/span[text()="Code"]');
            await findByXpath('//li[contains(@id, "react-tabs-") and @aria-selected="false"]/span[text()="Ruby"]');
        });
    });
});
