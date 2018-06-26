import {detectLocale} from '../../../src/lib/detect-locale.js';

const supportedLocales = ['en', 'es', 'pt-br', 'de', 'it'];

Object.defineProperty(window.location,
    'search',
    {value: '?name=val', configurable: true}
);
Object.defineProperty(window.navigator,
    'language',
    {value: 'en-US', configurable: true}
);

describe('detectLocale', () => {
    test('uses locale from the URL when present', () => {
        Object.defineProperty(window.location,
            'search',
            {value: '?locale=pt-br'}
        );
        expect(detectLocale(supportedLocales)).toEqual('pt-br');
    });

    test('is case insensitive', () => {
        Object.defineProperty(window.location,
            'search',
            {value: '?locale=pt-BR'}
        );
        expect(detectLocale(supportedLocales)).toEqual('pt-br');
    });

    test('also accepts lang from the URL when present', () => {
        Object.defineProperty(window.location,
            'search',
            {value: '?lang=it'}
        );
        expect(detectLocale(supportedLocales)).toEqual('it');
    });

    test('ignores unsupported locales', () => {
        Object.defineProperty(window.location,
            'search',
            {value: '?lang=sv'}
        );
        expect(detectLocale(supportedLocales)).toEqual('en');
    });

    test('ignores other parameters', () => {
        Object.defineProperty(window.location,
            'search',
            {value: '?enable=language'}
        );
        expect(detectLocale(supportedLocales)).toEqual('en');
    });

    test('uses navigator language property for default if supported', () => {
        Object.defineProperty(window.navigator,
            'language',
            {value: 'pt-BR'}
        );
        expect(detectLocale(supportedLocales)).toEqual('pt-br');
    });

    test('ignores navigator language property if unsupported', () => {
        Object.defineProperty(window.navigator,
            'language',
            {value: 'da'}
        );
        expect(detectLocale(supportedLocales)).toEqual('en');
    });
});
