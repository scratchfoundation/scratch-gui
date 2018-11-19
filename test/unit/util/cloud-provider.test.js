import CloudProvider from '../../../src/lib/cloud-provider';

let websocketConstructorCount = 0;

// Stub the global websocket so we can call open/close/error/send on it
global.WebSocket = function (url) {
    this._url = url;
    this._sentMessages = [];

    // These are not real websocket methods, but used to trigger callbacks
    this._open = () => this.onopen();
    this._error = e => this.onerror(e);
    this._receive = msg => this.onmessage(msg);

    // Stub the real websocket.send to store sent messages
    this.send = msg => this._sentMessages.push(msg);
    this.close = () => this.onclose();

    websocketConstructorCount++;
};
global.WebSocket.CLOSING = 'CLOSING';
global.WebSocket.CLOSED = 'CLOSED';

describe('CloudProvider', () => {
    let cloudProvider = null;
    let vmIOData = [];
    let timeout = 0;
    beforeEach(() => {
        vmIOData = [];
        cloudProvider = new CloudProvider();
        // Stub vm
        cloudProvider.vm = {
            postIOData: (_namespace, data) => {
                vmIOData.push(data);
            }
        };
        // Stub setTimeout so this can run instantly.
        cloudProvider.setTimeout = (fn, after) => {
            timeout = after;
            fn();
        };
        // Stub randomize to make it consistent for testing.
        cloudProvider.randomizeDuration = t => t;
    });

    test('updateVariable', () => {
        cloudProvider.updateVariable('hello', 1);
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('set');
        expect(obj.name).toEqual('hello');
        expect(obj.value).toEqual(1);
    });

    test('updateVariable with falsey value', () => {
        cloudProvider.updateVariable('hello', 0);
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('set');
        expect(obj.name).toEqual('hello');
        expect(obj.value).toEqual(0);
    });

    test('writeToServer with falsey index value', () => {
        cloudProvider.writeToServer('method', 'name', 5, 0);
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('method');
        expect(obj.name).toEqual('name');
        expect(obj.value).toEqual(5);
        expect(obj.index).toEqual(0);
    });

    test('onMessage ack', () => {
        const msg = JSON.stringify({
            method: 'ack',
            name: 'name'
        });
        cloudProvider.connection._receive({data: msg});
        expect(vmIOData[0].varCreate.name).toEqual('name');
    });

    test('onMessage set', () => {
        const msg = JSON.stringify({
            method: 'set',
            name: 'name',
            value: 'value'
        });
        cloudProvider.connection._receive({data: msg});
        expect(vmIOData[0].varUpdate.name).toEqual('name');
        expect(vmIOData[0].varUpdate.value).toEqual('value');
    });

    test('onMessage with multiple commands', () => {
        const msg1 = JSON.stringify({
            method: 'set',
            name: 'name1',
            value: 'value'
        });
        const msg2 = JSON.stringify({
            method: 'ack',
            name: 'name2'
        });
        cloudProvider.connection._receive({data: `${msg1}\n${msg2}`});
        expect(vmIOData[0].varUpdate.name).toEqual('name1');
        expect(vmIOData[1].varCreate.name).toEqual('name2');
    });

    test('connecting sets connnection attempts back to 1', () => {
        expect(cloudProvider.connectionAttempts).toBe(0);
        cloudProvider.connectionAttempts = 10;
        cloudProvider.connection._open();
        expect(cloudProvider.connectionAttempts).toBe(1);
    });

    test('disconnect waits for a period equal to 2^k-1 before trying again', () => {
        websocketConstructorCount = 1; // This is global, so set it back to 1 to start

        // Connection attempts should still be 0 because connection hasn't opened yet
        expect(cloudProvider.connectionAttempts).toBe(0);
        cloudProvider.connection._open();
        expect(cloudProvider.connectionAttempts).toBe(1);

        cloudProvider.connection.close();
        expect(timeout).toEqual(1 * 1000); // 2^1 - 1
        expect(websocketConstructorCount).toBe(2);
        expect(cloudProvider.connectionAttempts).toBe(2);

        cloudProvider.connection.close();
        expect(timeout).toEqual(3 * 1000); // 2^2 - 1
        expect(websocketConstructorCount).toBe(3);
        expect(cloudProvider.connectionAttempts).toBe(3);

        cloudProvider.connection.close();
        expect(timeout).toEqual(7 * 1000); // 2^3 - 1
        expect(websocketConstructorCount).toBe(4);
        expect(cloudProvider.connectionAttempts).toBe(4);

        cloudProvider.connection.close();
        expect(timeout).toEqual(15 * 1000); // 2^4 - 1
        expect(websocketConstructorCount).toBe(5);
        expect(cloudProvider.connectionAttempts).toBe(5);

        cloudProvider.connection.close();
        expect(timeout).toEqual(31 * 1000); // 2^5 - 1
        expect(websocketConstructorCount).toBe(6);
        expect(cloudProvider.connectionAttempts).toBe(6);

        cloudProvider.connection.close();
        expect(timeout).toEqual(31 * 1000); // maxed out at 2^5 - 1
        expect(websocketConstructorCount).toBe(7);
        expect(cloudProvider.connectionAttempts).toBe(7);
    });

    test('exponentialTimeout caps connection attempt number', () => {
        cloudProvider.connectionAttempts = 1000;
        expect(cloudProvider.exponentialTimeout()).toEqual(31 * 1000);
    });

    test('requestCloseConnection does not try to reconnect', () => {
        websocketConstructorCount = 1; // This is global, so set it back to 1 to start
        cloudProvider.requestCloseConnection();
        expect(websocketConstructorCount).toBe(1); // No reconnection attempts
    });
});
