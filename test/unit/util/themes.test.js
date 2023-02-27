import {defaultColors, DEFAULT_THEME, getColorsForTheme} from '../../../src/lib/themes';
import {injectExtensionBlockColors, injectExtensionCategoryColors} from '../../../src/lib/themes/blockHelpers';

jest.mock('../../../src/lib/themes/default-colors');
jest.mock('../../../src/lib/themes/dark-mode');

describe('themes', () => {
    let serializeToString;

    beforeEach(() => {
        serializeToString = jest.fn(() => 'mocked xml');

        global.XMLSerializer = () => ({
            serializeToString
        });
    });

    test('provides the default theme colors', () => {
        expect(defaultColors.motion.primary).toEqual('#111111');
    });

    test('returns the dark mode', () => {
        const colors = getColorsForTheme('dark-mode');

        expect(colors.motion.primary).toEqual('#AAAAAA');
    });

    test('uses default theme colors when not specified', () => {
        const colors = getColorsForTheme('dark-mode');

        expect(colors.motion.secondary).toEqual('#222222');
    });

    test('updates extension blocks based on theme', () => {
        const blockInfoJson = {
            type: 'dummy_block',
            colour: '#0FBD8C',
            colourSecondary: '#0DA57A',
            colourTertiary: '#0B8E69'
        };

        const updated = injectExtensionBlockColors(blockInfoJson, 'dark-mode');

        expect(updated).toEqual({
            type: 'dummy_block',
            colour: '#FFFFFF',
            colourSecondary: '#EEEEEE',
            colourTertiary: '#DDDDDD'
        });
        // The original value was not modified
        expect(blockInfoJson.colour).toBe('#0FBD8C');
    });

    test('bypasses updates if using the default theme', () => {
        const blockInfoJson = {
            type: 'dummy_block',
            colour: '#0FBD8C',
            colourSecondary: '#0DA57A',
            colourTertiary: '#0B8E69'
        };

        const updated = injectExtensionBlockColors(blockInfoJson, DEFAULT_THEME);

        expect(updated).toEqual({
            type: 'dummy_block',
            colour: '#0FBD8C',
            colourSecondary: '#0DA57A',
            colourTertiary: '#0B8E69'
        });
    });

    test('updates extension category based on theme', () => {
        const dynamicBlockXML = [
            {
                id: 'pen',
                xml: '<category name="Pen" id="pen" colour="#0FBD8C" secondaryColour="#0DA57A"></category>'
            }
        ];

        injectExtensionCategoryColors(dynamicBlockXML, 'dark-mode');

        // XMLSerializer is not available outside the browser.
        // Verify the mocked XMLSerializer.serializeToString is called with updated colors.
        expect(serializeToString.mock.calls[0][0].documentElement.getAttribute('colour')).toBe('#FFFFFF');
        expect(serializeToString.mock.calls[0][0].documentElement.getAttribute('secondaryColour')).toBe('#DDDDDD');
    });
});
