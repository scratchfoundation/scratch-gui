jest.mock('../../../src/lib/analytics.js', () => ({
    event: () => {}
}));

jest.mock('../../../src/lib/libraries/decks/index.jsx', () => ({
    noUrlId: {},
    foo: {urlId: 'one'},
    noUrlIdSandwich: {}
}));

import queryString from 'query-string';
import {detectTutorialId} from '../../../src/lib/tutorial-from-url.js';

test('returns the tutorial ID if the urlId matches', () => {
    const queryParams = queryString.parse('?tutorial=one');
    expect(detectTutorialId(queryParams)).toBe('foo');
});

test('returns null if no matching urlId', () => {
    const queryParams = queryString.parse('?tutorial=10');
    expect(detectTutorialId(queryParams)).toBe(null);
});

test('returns null if empty template', () => {
    const queryParams = queryString.parse('?tutorial=');
    expect(detectTutorialId(queryParams)).toBe(null);
});

test('returns null if no query param', () => {
    const queryParams = queryString.parse('');
    expect(detectTutorialId(queryParams)).toBe(null);
});

test('returns null if unrecognized template', () => {
    const queryParams = queryString.parse('?tutorial=asdf');
    expect(detectTutorialId(queryParams)).toBe(null);
});

test('takes the first of multiple', () => {
    const queryParams = queryString.parse('?tutorial=one&tutorial=two');
    expect(detectTutorialId(queryParams)).toBe('foo');
});

test('returns all for the tutorial library shortcut', () => {
    const queryParams = queryString.parse('?tutorial=all');
    expect(detectTutorialId(queryParams)).toBe('all');
});
