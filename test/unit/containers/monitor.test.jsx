import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';

import Monitor from '../../../src/containers/monitor';
import importCSV from '../../../src/lib/import-csv';
import {setVariableValue} from '../../../src/lib/variable-utils';

jest.mock('react-ga');
jest.mock('../../../src/lib/import-csv', () => ({
    __esModule: true,
    default: jest.fn()
}));
jest.mock('../../../src/lib/variable-utils', () => ({
    getVariable: jest.fn(),
    setVariableValue: jest.fn()
}));

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Monitor Container', () => {
    const mockStore = configureStore();
    let store;
    let vm;

    beforeEach(() => {
        vm = {
            runtime: {
                getLabelForOpcode: jest.fn(() => ({label: 'my list', category: 'data'})),
                requestUpdateMonitor: jest.fn()
            }
        };
        store = mockStore({
            scratchGui: {
                monitorLayout: {monitors: {}, savedMonitorPositions: {}},
                theme: {theme: 'default'},
                toolbox: {toolboxXML: ''},
                vm: vm
            }
        });
        setVariableValue.mockClear();
    });

    const mountMonitor = () => mountWithIntl(
        <Provider store={store}>
            <Monitor
                id="my-list"
                opcode="data_listcontents"
                mode="list"
                targetId="target1"
                params={{}}
                value={['existing']}
                draggable={false}
                vm={vm}
            />
        </Provider>
    );

    test('cancelling the column prompt leaves the list unchanged', async () => {
        importCSV.mockReturnValue(Promise.resolve([['a1', 'a2'], ['b1', 'b2']]));
        window.prompt = jest.fn(() => null); // user presses cancel

        const wrapper = mountMonitor();
        const instance = wrapper.find('Monitor').instance();
        instance.handleImport();
        await flushPromises();

        expect(window.prompt).toHaveBeenCalled();
        expect(setVariableValue).not.toHaveBeenCalled();
    });

    test('choosing a column imports that column into the list', async () => {
        importCSV.mockReturnValue(Promise.resolve([['a1', 'a2'], ['b1', 'b2']]));
        window.prompt = jest.fn(() => '2'); // user picks the second column

        const wrapper = mountMonitor();
        const instance = wrapper.find('Monitor').instance();
        instance.handleImport();
        await flushPromises();

        expect(setVariableValue).toHaveBeenCalledWith(vm, 'target1', 'my-list', ['a2', 'b2']);
    });
});
