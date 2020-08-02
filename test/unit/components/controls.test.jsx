import React from 'react';
import {mountWithIntl} from '../../helpers/intl-helpers.jsx';
import Controls from '../../../src/components/controls/controls';
import TurboMode from '../../../src/components/turbo-mode/turbo-mode';
import GreenFlag from '../../../src/components/green-flag/green-flag';
import StopAll from '../../../src/components/stop-all/stop-all';

describe('Controls component', () => {
    const defaultProps = () => ({
        active: false,
        onGreenFlagClick: jest.fn(),
        onStopAllClick: jest.fn(),
        turbo: false
    });

    test('shows turbo mode when in turbo mode', () => {
        const component = mountWithIntl(
            <Controls
                {...defaultProps()}
            />
        );
        expect(component.find(TurboMode).exists()).toEqual(false);
        component.setProps({turbo: true});
        expect(component.find(TurboMode).exists()).toEqual(true);
    });

    test('triggers the right callbacks when clicked', () => {
        const props = defaultProps();
        const component = mountWithIntl(
            <Controls
                {...props}
            />
        );
        component.find(GreenFlag).simulate('click');
        expect(props.onGreenFlagClick).toHaveBeenCalled();

        component.find(StopAll).simulate('click');
        expect(props.onStopAllClick).toHaveBeenCalled();
    });
});
