import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from 'react-popover';
import {injectIntl, intlShape, defineMessages, FormattedMessage} from 'react-intl';

import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import Dial from './dial.jsx';

import styles from './direction-picker.css';

import allAroundIcon from './icon--all-around.svg';
import leftRightIcon from './icon--left-right.svg';
import dontRotateIcon from './icon--dont-rotate.svg';

const BufferedInput = BufferedInputHOC(Input);

const directionLabel = (
    <FormattedMessage
        defaultMessage="Direction"
        description="Sprite info direction label"
        id="gui.SpriteInfo.direction"
    />
);

const RotationStyles = {
    ALL_AROUND: 'all around',
    LEFT_RIGHT: 'left-right',
    DONT_ROTATE: "don't rotate"
};

const messages = defineMessages({
    allAround: {
        id: 'gui.directionPicker.rotationStyles.allAround',
        description: 'Button to change to the all around rotation style',
        defaultMessage: 'All Around'
    },
    leftRight: {
        id: 'gui.directionPicker.rotationStyles.leftRight',
        description: 'Button to change to the left-right rotation style',
        defaultMessage: 'Left/Right'
    },
    dontRotate: {
        id: 'gui.directionPicker.rotationStyles.dontRotate',
        description: 'Button to change to the dont rotate rotation style',
        defaultMessage: 'Do not rotate'
    }
});

class DirectionPicker extends React.Component {
    constructor (props) {
        super(props);
        this.isNum = function (x) {
            return !isNaN(x);
        };
    }

    render () {
        return (
            <Label
                secondary
                above={this.props.labelAbove}
                text={directionLabel}
            >
                <Popover
                    body={
                        <div>
                            <Dial
                                direction={this.props.direction}
                                onChange={this.props.onChangeDirection}
                            />
                            <div className={styles.buttonRow}>
                                <button
                                    className={classNames(styles.iconButton, {
                                        [styles.active]: this.props.rotationStyle === RotationStyles.ALL_AROUND
                                    })}
                                    title={this.props.intl.formatMessage(messages.allAround)}
                                    onClick={this.props.onClickAllAround}
                                >
                                    <img
                                        draggable={false}
                                        src={allAroundIcon}
                                    />
                                </button>
                                <button
                                    className={classNames(styles.iconButton, {
                                        [styles.active]: this.props.rotationStyle === RotationStyles.LEFT_RIGHT
                                    })}
                                    title={this.props.intl.formatMessage(messages.leftRight)}
                                    onClick={this.props.onClickLeftRight}
                                >
                                    <img
                                        draggable={false}
                                        src={leftRightIcon}
                                    />
                                </button>
                                <button
                                    className={classNames(styles.iconButton, {
                                        [styles.active]: this.props.rotationStyle === RotationStyles.DONT_ROTATE
                                    })}
                                    title={this.props.intl.formatMessage(messages.dontRotate)}
                                    onClick={this.props.onClickDontRotate}
                                >
                                    <img
                                        draggable={false}
                                        src={dontRotateIcon}
                                    />
                                </button>
                            </div>
                        </div>
                    }
                    isOpen={this.props.popoverOpen}
                    preferPlace="above"
                    onOuterAction={this.props.onClosePopover}
                >
                    <BufferedInput
                        small
                        disabled={this.props.disabled}
                        label={directionLabel}
                        tabIndex="0"
                        type="text"
                        validateInput={this.isNum}
                        value={this.props.disabled ? '' : this.props.direction}
                        onFocus={this.props.onOpenPopover}
                        onSubmit={this.props.onChangeDirection}
                    />
                </Popover>
            </Label>
        );
    }
}

DirectionPicker.propTypes = {
    direction: PropTypes.number,
    disabled: PropTypes.bool.isRequired,
    intl: intlShape,
    labelAbove: PropTypes.bool,
    onChangeDirection: PropTypes.func.isRequired,
    onClickAllAround: PropTypes.func.isRequired,
    onClickDontRotate: PropTypes.func.isRequired,
    onClickLeftRight: PropTypes.func.isRequired,
    onClosePopover: PropTypes.func.isRequired,
    onOpenPopover: PropTypes.func.isRequired,
    popoverOpen: PropTypes.bool.isRequired,
    rotationStyle: PropTypes.string
};

DirectionPicker.defaultProps = {
    labelAbove: false
};

const WrappedDirectionPicker = injectIntl(DirectionPicker);

export {
    WrappedDirectionPicker as default,
    RotationStyles
};
