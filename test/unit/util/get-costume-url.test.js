import {HAS_FONT_REGEXP} from '../../../src/lib/get-costume-url';

describe('SVG Font Parsing', () => {
    test('Has font regexp works', () => {
        expect('font-family="Sans Serif"'.match(HAS_FONT_REGEXP)).toBeTruthy();
        expect('font-family="none" font-family="Sans Serif"'.match(HAS_FONT_REGEXP)).toBeTruthy();
        expect('font-family = "Sans Serif"'.match(HAS_FONT_REGEXP)).toBeTruthy();

        expect('font-family="none"'.match(HAS_FONT_REGEXP)).toBeFalsy();
    });
});
