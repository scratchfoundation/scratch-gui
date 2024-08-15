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

    test('createVariable', () => {
        cloudProvider.createVariable('hello', 1);
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('create');
        expect(obj.name).toEqual('hello');
        expect(obj.value).toEqual(1);
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

    test('renameVariable', () => {
        cloudProvider.renameVariable('oldName', 'newName');
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('rename');
        expect(obj.name).toEqual('oldName');
        expect(typeof obj.value).toEqual('undefined');
        expect(obj.new_name).toEqual('newName');
    });

    test('deleteVariable', () => {
        cloudProvider.deleteVariable('hello');
        const obj = JSON.parse(cloudProvider.connection._sentMessages[0]);
        expect(obj.method).toEqual('delete');
        expect(obj.name).toEqual('hello');
        expect(typeof obj.value).toEqual('undefined');
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

    test('onMessage with newline at the end', () => {
        const msg1 = JSON.stringify({
            method: 'set',
            name: 'name1',
            value: 'value'
        });
        cloudProvider.onMessage({data: `${msg1}\n`});
        expect(vmIOData[0].varUpdate.name).toEqual('name1');
    });

    test('onMessage with multiple commands', () => {
        const msg1 = JSON.stringify({
            method: 'set',
            name: 'name1',
            value: 'value'
        });
        const msg2 = JSON.stringify({
            method: 'set',
            name: 'name2',
            value: 'value2'
        });
        cloudProvider.connection._receive({data: `${msg1}\n${msg2}`});
        expect(vmIOData[0].varUpdate.name).toEqual('name1');
        expect(vmIOData[1].varUpdate.name).toEqual('name2');
    });

    test('connnection attempts set back to 1 when socket is opened', () => {
        cloudProvider.connectionAttempts = 100;
        cloudProvider.connection._open();
        expect(cloudProvider.connectionAttempts).toBe(1);
    });

    test('disconnect waits for a period equal to 2^k-1 before trying again', () => {
        websocketConstructorCount = 1; // This is global, so set it back to 1 to start
        // Constructor attempts to open connection, so attempts is initially 1
        expect(cloudProvider.connectionAttempts).toBe(1);

        // Make sure a close without a previous OPEN still waits 1s before reconnecting
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

    test('close after connection is opened waits 1s before reconnecting', () => {
        // This test is basically to check that opening the connection does not impact
        // the time until reconnection for the first reconnect.
        // It is easy to introduce a bug that causes reconnection time to be different
        // based on whether an initial connection was made.
        websocketConstructorCount = 1;
        cloudProvider.connection._open();
        cloudProvider.connection.close();
        expect(timeout).toEqual(1 * 1000); // 2^1 - 1
        expect(websocketConstructorCount).toBe(2);
        expect(cloudProvider.connectionAttempts).toBe(2);
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
