import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import {injectIntl, intlShape, defineMessages, FormattedMessage} from 'react-intl';

import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';
import styles from './sprite-info.css';

import xIcon from './icon--x.svg';
import yIcon from './icon--y.svg';
import showIcon from './icon--show.svg';
import hideIcon from './icon--hide.svg';

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    spritePlaceholder: {
        id: 'gui.SpriteInfo.spritePlaceholder',
        defaultMessage: 'Name',
        description: 'Placeholder text for sprite name'
    }
});

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.direction !== nextProps.direction ||
            this.props.disabled !== nextProps.disabled ||
            this.props.name !== nextProps.name ||
            this.props.size !== nextProps.size ||
            this.props.stageSize !== nextProps.stageSize ||
            this.props.visible !== nextProps.visible ||
            this.props.x !== nextProps.x ||
            this.props.y !== nextProps.y
        );
    }
    render () {
        const {
            stageSize
        } = this.props;

        const sprite = (
            <FormattedMessage
                defaultMessage="Sprite"
                description="Sprite info label"
                id="gui.SpriteInfo.sprite"
            />
        );
        const showLabel = (
            <FormattedMessage
                defaultMessage="Show"
                description="Sprite info show label"
                id="gui.SpriteInfo.show"
            />
        );
        const sizeLabel = (
            <FormattedMessage
                defaultMessage="Size"
                description="Sprite info size label"
                id="gui.SpriteInfo.size"
            />
        );
        const directionLabel = (
            <FormattedMessage
                defaultMessage="Direction"
                description="Sprite info direction label"
                id="gui.SpriteInfo.direction"
            />
        );

        const spriteNameInput = (
            <BufferedInput
                className={styles.spriteInput}
                disabled={this.props.disabled}
                placeholder={this.props.intl.formatMessage(messages.spritePlaceholder)}
                tabIndex="0"
                type="text"
                value={this.props.disabled ? '' : this.props.name}
                onSubmit={this.props.onChangeName}
            />
        );

        const xPosition = (
            <div className={styles.group}>
                {
                    (stageSize === STAGE_DISPLAY_SIZES.large) ?
                        <div className={styles.iconWrapper}>
                            <img
                                aria-hidden="true"
                                className={classNames(styles.xIcon, styles.icon)}
                                src={xIcon}
                            />
                        </div> :
                        null
                }
                <Label text="x">
                    <BufferedInput
                        small
                        disabled={this.props.disabled}
                        placeholder="x"
                        tabIndex="0"
                        type="text"
                        value={this.props.disabled ? '' : this.props.x}
                        onSubmit={this.props.onChangeX}
                    />
                </Label>
            </div>
        );

        const yPosition = (
            <div className={styles.group}>
                {
                    (stageSize === STAGE_DISPLAY_SIZES.large) ?
                        <div className={styles.iconWrapper}>
                            <img
                                aria-hidden="true"
                                className={classNames(styles.yIcon, styles.icon)}
                                src={yIcon}
                            />
                        </div> :
                        null
                }
                <Label text="y">
                    <BufferedInput
                        small
                        disabled={this.props.disabled}
                        placeholder="y"
                        tabIndex="0"
                        type="text"
                        value={this.props.disabled ? '' : this.props.y}
                        onSubmit={this.props.onChangeY}
                    />
                </Label>
            </div>
        );

        if (stageSize === STAGE_DISPLAY_SIZES.small) {
            return (
                <Box className={styles.spriteInfo}>
                    <div className={classNames(styles.row, styles.rowPrimary)}>
                        <div className={styles.group}>
                            {spriteNameInput}
                        </div>
                    </div>
                    <div className={classNames(styles.row, styles.rowSecondary)}>
                        {xPosition}
                        {yPosition}
                    </div>
                </Box>
            );
        }

        return (
            <Box className={styles.spriteInfo}>
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={styles.group}>
                        <Label text={sprite}>
                            {spriteNameInput}
                        </Label>
                    </div>
                    {xPosition}
                    {yPosition}
                </div>
                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={styles.group}>
                        {
                            stageSize === STAGE_DISPLAY_SIZES.large ?
                                <Label
                                    secondary
                                    text={showLabel}
                                /> :
                                null
                        }
                        <div className={styles.radioWrapper}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLeft,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: this.props.visible && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickVisible}
                                onKeyPress={this.props.onPressVisible}
                            >
                                <img
                                    className={styles.icon}
                                    src={showIcon}
                                />
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioRight,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: !this.props.visible && !this.props.disabled,
                                        [styles.isDisabled]: this.props.disabled
                                    }
                                )}
                                tabIndex="0"
                                onClick={this.props.onClickNotVisible}
                                onKeyPress={this.props.onPressNotVisible}
                            >
                                <img
                                    className={styles.icon}
                                    src={hideIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames(styles.group, styles.largerInput)}>
                        <Label
                            secondary
                            text={sizeLabel}
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label={sizeLabel}
                                tabIndex="0"
                                type="text"
                                value={this.props.disabled ? '' : this.props.size}
                                onSubmit={this.props.onChangeSize}
                            />
                        </Label>
                    </div>
                    <div className={classNames(styles.group, styles.largerInput)}>
                        <Label
                            secondary
                            text={directionLabel}
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label={directionLabel}
                                tabIndex="0"
                                type="text"
                                value={this.props.disabled ? '' : this.props.direction}
                                onSubmit={this.props.onChangeDirection}
                            />
                        </Label>
                    </div>
                </div>
            </Box>
        );
    }
}

SpriteInfo.propTypes = {
    direction: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    intl: intlShape,
    name: PropTypes.string,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeSize: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    onClickNotVisible: PropTypes.func,
    onClickVisible: PropTypes.func,
    onPressNotVisible: PropTypes.func,
    onPressVisible: PropTypes.func,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    visible: PropTypes.bool,
    x: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    y: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default injectIntl(SpriteInfo);
