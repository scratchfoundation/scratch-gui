import {defaultColors, getColorsForTheme} from '../../../src/lib/themes';

jest.mock('../../../src/lib/themes/default-colors');
jest.mock('../../../src/lib/themes/dark-mode');

describe('themes', () => {
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
});
