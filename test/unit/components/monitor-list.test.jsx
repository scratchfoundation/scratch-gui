import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import MonitorList from '../../../src/components/monitor-list/monitor-list.jsx';
import {OrderedMap} from 'immutable';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('MonitorListComponent', () => {
    const store = configureStore()({scratchGui: {
        monitorLayout: {
            monitors: {},
            savedMonitorPositions: {}
        },
        vm: {
            runtime: {
                requestUpdateMonitor: () => {},
                getLabelForOpcode: () => ''
            }
        }
    }});
    const draggable = false;
    const onMonitorChange = jest.fn();
    const stageSize = {
        width: 100,
        height: 100,
        widthDefault: 100,
        heightDefault: 100
    };

    let monitors = OrderedMap({});

    // Wrap this in a function so it gets test specific states and can be reused.
    const getComponent = function () {
        return (
            <Provider store={store}>
                <MonitorList
                    draggable={draggable}
                    monitors={monitors}
                    stageSize={stageSize}
                    onMonitorChange={onMonitorChange}
                />
            </Provider>
        );
    };

    test('it renders the correct step size for discrete sliders', () => {
        monitors = OrderedMap({
            id1: {
                visible: true,
                mode: 'slider',
                isDiscrete: true
            }
        });
        const wrapper = mountWithIntl(getComponent());
        const input = wrapper.find('input');
        expect(input.props().step).toBe(1);
    });

    test('it renders the correct step size for non-discrete sliders', () => {
        monitors = OrderedMap({
            id1: {
                visible: true,
                mode: 'slider',
                isDiscrete: false
            }
        });
        const wrapper = mountWithIntl(getComponent());
        const input = wrapper.find('input');
        expect(input.props().step).toBe(0.01);
    });
});
