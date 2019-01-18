import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import DirectionComponent, {RotationStyles} from '../components/direction-picker/direction-picker.jsx';

class DirectionPicker extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOpenPopover',
            'handleClosePopover',
            'handleClickLeftRight',
            'handleClickDontRotate',
            'handleClickAllAround',
            'handleChangeDirection'
        ]);
        this.state = {
            popoverOpen: false,
            direction: props.direction
        };
    }
    componentWillReceiveProps (nextProps) {
        this.setState({direction: nextProps.direction});
    }
    handleOpenPopover () {
        this.setState({popoverOpen: true});
    }
    handleClosePopover () {
        this.setState({popoverOpen: false});
    }
    handleClickAllAround () {
        this.props.onChangeRotationStyle(RotationStyles.ALL_AROUND);
    }
    handleClickLeftRight () {
        this.props.onChangeRotationStyle(RotationStyles.LEFT_RIGHT);
    }
    handleClickDontRotate () {
        this.props.onChangeRotationStyle(RotationStyles.DONT_ROTATE);
    }
    handleChangeDirection (direction) {
        // Wrap clamp the dial output to [-180, 180]
        const clamped = Math.round(direction - (Math.floor((direction + 179) / 360) * 360));
        this.setState({direction: Math.round(clamped)}); // Display as rounded

        // Send the raw direction to the VM, it will wrap it but not round it
        this.props.onChangeDirection(direction);
    }
    render () {
        return (
            <DirectionComponent
                direction={this.state.direction}
                disabled={this.props.disabled}
                labelAbove={this.props.labelAbove}
                popoverOpen={this.state.popoverOpen && !this.props.disabled}
                rotationStyle={this.props.rotationStyle}
                onChangeDirection={this.handleChangeDirection}
                onClickAllAround={this.handleClickAllAround}
                onClickDontRotate={this.handleClickDontRotate}
                onClickLeftRight={this.handleClickLeftRight}
                onClosePopover={this.handleClosePopover}
                onOpenPopover={this.handleOpenPopover}
            />
        );
    }
}

DirectionPicker.propTypes = {
    direction: PropTypes.number,
    disabled: PropTypes.bool,
    labelAbove: PropTypes.bool,
    onChangeDirection: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    rotationStyle: PropTypes.string
};

export default DirectionPicker;
