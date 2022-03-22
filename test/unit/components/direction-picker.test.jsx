import React from 'react';
import {componentWithIntl} from '../../helpers/intl-helpers';
import RotationStyles from '../../../src/components/direction-picker/direction-picker';
import DirectionPicker from '../../../src/components/direction-picker/direction-picker';
import PropTypes from 'prop-types';
import {intlShape} from 'react-intl';

describe('DirectionPicker', () => {

    const getComponent = function (props = {}) {
        return <DirectionPicker {...props} />;
    };

    test('matches snapshot', () => {
        const props = {
            // direction: PropTypes.number,
            disabled: false,
            // intl: intlShape,
            // labelAbove: PropTypes.bool,
            onChangeDirection: jest.fn(),
            onClickAllAround: jest.fn(),
            onClickDontRotate: jest.fn(),
            onClickLeftRight: jest.fn(),
            onClosePopover: jest.fn(),
            onOpenPopover: jest.fn(),
            popoverOpen: false
            // rotationStyle: PropTypes.string
        };


        const component = componentWithIntl(getComponent(props));
        const picker = component.root.findByType(DirectionPicker);
        console.log(picker);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
