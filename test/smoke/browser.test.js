import SeleniumHelper from '../helpers/selenium-helper';
const {SAUCE_USERNAME, SAUCE_ACCESS_KEY, SMOKE_URL} = process.env;
const {
    getSauceDriver,
    findByText
} = new SeleniumHelper();

// Make the default timeout longer, Sauce tests take ~30s
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000; // eslint-disable-line

const SUPPORTED_MESSAGE = 'Welcome to the Scratch 3.0 Beta';
const UNSUPPORTED_MESSAGE = 'Scratch 3.0 does not support Internet Explorer';

// Driver configs can be generated with the Sauce Platform Configurator
// https://wiki.saucelabs.com/display/DOCS/Platform+Configurator
describe('Smoke tests on older browsers', () => {
    let driver;

    afterEach(async () => {
        if (driver) await driver.quit();
    });

    test('Credentials should be provided', () => {
        expect(SAUCE_USERNAME && SAUCE_ACCESS_KEY && SMOKE_URL).toBeTruthy();
    });

    test('IE 11 should be unsupported', async () => {
        const driverConfig = {
            browserName: 'internet explorer',
            platform: 'Windows 10',
            version: '11.103'
        };
        driver = await getSauceDriver(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            driverConfig);
        await driver.get(process.env.SMOKE_URL);
        const el = await findByText(UNSUPPORTED_MESSAGE);
        const isDisplayed = await el.isDisplayed();
        return expect(isDisplayed).toEqual(true);
    });

    test('Safari 9 should be supported', async () => {
        const driverConfig = {
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '9.0'
        };
        driver = await getSauceDriver(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            driverConfig);
        await driver.get(process.env.SMOKE_URL);
        const el = await findByText(SUPPORTED_MESSAGE);
        const isDisplayed = await el.isDisplayed();
        return expect(isDisplayed).toEqual(true);
    });

    test('Safari 10 should be supported', async () => {
        const driverConfig = {
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '10.0'
        };
        driver = await getSauceDriver(
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            driverConfig);
        await driver.get(process.env.SMOKE_URL);
        const el = await findByText(SUPPORTED_MESSAGE);
        const isDisplayed = await el.isDisplayed();
        return expect(isDisplayed).toEqual(true);
    });
});
