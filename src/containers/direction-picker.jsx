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
            'handleClickAllAround'
        ]);
        this.state = {
            popoverOpen: false
        };
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
    render () {
        return (
            <DirectionComponent
                direction={this.props.direction}
                disabled={this.props.disabled}
                popoverOpen={this.state.popoverOpen && !this.props.disabled}
                rotationStyle={this.props.rotationStyle}
                onChangeDirection={this.props.onChangeDirection}
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
    onChangeDirection: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    rotationStyle: PropTypes.string
};

export default DirectionPicker;
