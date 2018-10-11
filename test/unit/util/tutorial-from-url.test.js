jest.mock('../../../src/lib/analytics.js', () => ({
    event: () => {}
}));

jest.mock('../../../src/lib/libraries/decks/index.jsx', () => ({
    foo: {urlId: 1}
}));

import {detectTutorialId} from '../../../src/lib/tutorial-from-url.js';

Object.defineProperty(
    window.location,
    'search',
    {value: '', writable: true}
);

test('returns the tutorial ID if the urlId matches', () => {
    window.location.search = '?tutorial=1';
    expect(detectTutorialId()).toBe('foo');
});

test('returns null if no matching urlId', () => {
    window.location.search = '?tutorial=10';
    expect(detectTutorialId()).toBe(null);
});

test('returns null if empty template', () => {
    window.location.search = '?tutorial=';
    expect(detectTutorialId()).toBe(null);
});

test('returns null if non-numeric template', () => {
    window.location.search = '?tutorial=asdf';
    expect(detectTutorialId()).toBe(null);
});

test('takes the first of multiple', () => {
    window.location.search = '?tutorial=1&tutorial=2';
    expect(detectTutorialId()).toBe('foo');
});
