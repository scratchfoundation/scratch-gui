import React from 'react';
import {shallow} from 'enzyme';
import DefaultMonitor from '../../../src/components/monitor/default-monitor';
import Monitor from '../../../src/components/monitor/monitor';
import {DARK_THEME, DEFAULT_THEME} from '../../../src/lib/themes';

jest.mock('../../../src/lib/themes/default');
jest.mock('../../../src/lib/themes/dark');

describe('Monitor Component', () => {
    test('it selects the correct colors based on default theme', () => {
        const noop = () => {};

        const wrapper = shallow(<Monitor
            category="motion"
            // eslint-disable-next-line react/jsx-no-bind
            componentRef={noop}
            draggable={false}
            label="My label"
            mode="default"
            // eslint-disable-next-line react/jsx-no-bind
            onDragEnd={noop}
            // eslint-disable-next-line react/jsx-no-bind
            onNextMode={noop}
            theme={DEFAULT_THEME}
        />);

        const defaultMonitor = wrapper.find(DefaultMonitor);

        // selects colors from mock value in src/lib/themes/__mocks__/default-colors.js
        expect(defaultMonitor.props().categoryColor).toEqual({background: '#111111', text: '#444444'});
    });

    test('it selects the correct colors based on dark mode theme', () => {
        const noop = () => {};

        const wrapper = shallow(<Monitor
            category="motion"
            // eslint-disable-next-line react/jsx-no-bind
            componentRef={noop}
            draggable={false}
            label="My label"
            mode="default"
            // eslint-disable-next-line react/jsx-no-bind
            onDragEnd={noop}
            // eslint-disable-next-line react/jsx-no-bind
            onNextMode={noop}
            theme={DARK_THEME}
        />);

        const defaultMonitor = wrapper.find(DefaultMonitor);

        // selects colors from mock value in src/lib/themes/__mocks__/dark-mode.js
        expect(defaultMonitor.props().categoryColor).toEqual({background: '#AAAAAA', text: '#BBBBBB'});
    });
});
