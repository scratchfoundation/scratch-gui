import CloudProvider from '../../../src/lib/cloud-provider';

// Disable window.WebSocket
global.WebSocket = null;

describe('CloudProvider', () => {
    let cloudProvider = null;
    let sentMessage = null;

    beforeEach(() => {
        cloudProvider = new CloudProvider();
        // Stub connection
        cloudProvider.connection = {
            send: msg => {
                sentMessage = msg;
            }
        };
    });

    test('updateVariable', () => {
        cloudProvider.updateVariable('hello', 1);
        const obj = JSON.parse(sentMessage);
        expect(obj.method).toEqual('set');
        expect(obj.name).toEqual('hello');
        expect(obj.value).toEqual(1);
    });

    test('updateVariable with falsey value', () => {
        cloudProvider.updateVariable('hello', 0);
        const obj = JSON.parse(sentMessage);
        expect(obj.method).toEqual('set');
        expect(obj.name).toEqual('hello');
        expect(obj.value).toEqual(0);
    });

    test('writeToServer with falsey index value', () => {
        cloudProvider.writeToServer('method', 'name', 5, 0);
        const obj = JSON.parse(sentMessage);
        expect(obj.method).toEqual('method');
        expect(obj.name).toEqual('name');
        expect(obj.value).toEqual(5);
        expect(obj.index).toEqual(0);
    });
});
