import React from 'react';
import {shallowWithIntl} from '../../helpers/intl-helpers.jsx';
import Controls from '../../../src/components/controls/controls';
import TurboMode from '../../../src/components/turbo-mode/turbo-mode';

describe('Controls component', () => {
    const defaultProps = () => ({
        active: false,
        greenFlagTitle: 'Go',
        onGreenFlagClick: jest.fn(),
        onStopAllClick: jest.fn(),
        stopAllTitle: 'Stop',
        turbo: false
    });

    test('shows turbo mode when in turbo mode', () => {
        const component = shallowWithIntl(
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
        const component = shallowWithIntl(
            <Controls
                {...props}
            />
        );
        component.find('[title="Go"]').simulate('click');
        expect(props.onGreenFlagClick).toHaveBeenCalled();

        component.find('[title="Stop"]').simulate('click');
        expect(props.onStopAllClick).toHaveBeenCalled();
    });
});
