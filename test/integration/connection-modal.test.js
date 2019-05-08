import path from 'path';
import SeleniumHelper from '../helpers/selenium-helper';

const uri = path.resolve(__dirname, '../../build/index.html');

// The tests below require Scratch Link to be unavailable, so we can trigger
// an error modal. To make sure this is always true, we came up with the idea of
// injecting javascript that overwrites the global Websocket object with one that
// attempts to connect to a fake socket address.
const websocketFakeoutJs = `var RealWebSocket = WebSocket;
    WebSocket = function () {
        return new RealWebSocket("wss://fake.fake");
    }`;

describe('Hardware extension connection modal', () => {
    test('Message saying Scratch Link is unavailable (BLE)', async () => {
        const {
            clickText,
            clickXpath,
            findByText,
            getDriver,
            getLogs,
            loadUri
        } = new SeleniumHelper();

        const driver = getDriver();

        await loadUri(uri);

        await driver.executeScript(websocketFakeoutJs);

        await clickXpath('//button[@title="Add Extension"]');

        await clickText('micro:bit');
        findByText('Scratch Link'); // Scratch Link is mentioned in the error modal

        const logs = await getLogs();
        await expect(logs).toEqual([]);
        await driver.quit();
    });

    test('Message saying Scratch Link is unavailable (BT)', async () => {
        const {
            clickText,
            clickXpath,
            findByText,
            getDriver,
            getLogs,
            loadUri
        } = new SeleniumHelper();

        const driver = getDriver();

        await loadUri(uri);

        await driver.executeScript(websocketFakeoutJs);

        await clickXpath('//button[@title="Add Extension"]');

        await clickText('EV3');
        findByText('Scratch Link'); // Scratch Link is mentioned in the error modal

        const logs = await getLogs();
        await expect(logs).toEqual([]);
        await driver.quit();
    });
});
