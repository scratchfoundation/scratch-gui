import React from 'react';
import {mount} from 'enzyme';

import ThrottledPropertyHOC from '../../../src/lib/throttled-property-hoc.jsx';

describe('VMListenerHOC', () => {
    let mounted;
    const throttleTime = 500;
    beforeEach(() => {
        const Component = ({propToThrottle, doNotThrottle}) => (
            <input
                name={doNotThrottle}
                value={propToThrottle}
            />
        );
        const WrappedComponent = ThrottledPropertyHOC('propToThrottle', throttleTime)(Component);

        global.Date.now = () => 0;

        mounted = mount(
            <WrappedComponent
                doNotThrottle="oldvalue"
                propToThrottle={0}
            />
        );
    });

    test('it passes the props on initial render ', () => {
        expect(mounted.find('[value=0]').exists()).toEqual(true);
        expect(mounted.find('[name="oldvalue"]').exists()).toEqual(true);
    });

    test('it does not rerender if throttled prop is updated too soon', () => {
        global.Date.now = () => throttleTime / 2;
        mounted.setProps({propToThrottle: 1});
        mounted.update();
        expect(mounted.find('[value=0]').exists()).toEqual(true);
    });

    test('it does rerender if throttled prop is updated after throttle timeout', () => {
        global.Date.now = () => throttleTime * 2;
        mounted.setProps({propToThrottle: 1});
        mounted.update();
        expect(mounted.find('[value=1]').exists()).toEqual(true);
    });

    test('it does rerender if a non-throttled prop is changed', () => {
        global.Date.now = () => throttleTime / 2;
        mounted.setProps({doNotThrottle: 'newvalue', propToThrottle: 2});
        mounted.update();
        expect(mounted.find('[name="newvalue"]').exists()).toEqual(true);
        expect(mounted.find('[value=2]').exists()).toEqual(true);
    });
});
