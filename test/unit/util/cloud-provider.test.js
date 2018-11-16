import CloudProvider from '../../../src/lib/cloud-provider';

// Disable window.WebSocket
global.WebSocket = null;

describe('CloudProvider', () => {
    let cloudProvider = null;
    let sentMessage = null;
    let vmIOData = [];

    beforeEach(() => {
        vmIOData = [];
        cloudProvider = new CloudProvider();
        // Stub connection
        cloudProvider.connection = {
            send: msg => {
                sentMessage = msg;
            }
        };
        // Stub vm
        cloudProvider.vm = {
            postIOData: (_namespace, data) => {
                vmIOData.push(data);
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

    test('onMessage ack', () => {
        const msg = JSON.stringify({
            method: 'ack',
            name: 'name'
        });
        cloudProvider.onMessage({data: msg});
        expect(vmIOData[0].varCreate.name).toEqual('name');
    });

    test('onMessage set', () => {
        const msg = JSON.stringify({
            method: 'set',
            name: 'name',
            value: 'value'
        });
        cloudProvider.onMessage({data: msg});
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
            method: 'ack',
            name: 'name2'
        });
        cloudProvider.onMessage({data: `${msg1}\n${msg2}`});
        expect(vmIOData[0].varUpdate.name).toEqual('name1');
        expect(vmIOData[1].varCreate.name).toEqual('name2');
    });
});
