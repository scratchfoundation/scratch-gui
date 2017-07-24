import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import styles from './sprite-info.css';

import xIcon from './icon--x.svg';
import yIcon from './icon--y.svg';
import showIcon from './icon--show.svg';
import hideIcon from './icon--hide.svg';

const BufferedInput = BufferedInputHOC(Input);
const ROTATION_STYLES = ['left-right', 'don\'t rotate', 'all around'];

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.direction !== nextProps.direction ||
            this.props.disabled !== nextProps.disabled ||
            this.props.name !== nextProps.name ||
            this.props.rotationStyle !== nextProps.rotationStyle ||
            this.props.visible !== nextProps.visible ||
            this.props.x !== nextProps.x ||
            this.props.y !== nextProps.y
        );
    }
    render () {
        return (
            <Box
                className={styles.spriteInfo}
            >
                <div className={classNames(styles.row, styles.rowPrimary)}>
                    <div className={styles.group}>
                        <Label text="Sprite">
                            <BufferedInput
                                disabled={this.props.disabled}
                                placeholder="Name"
                                tabIndex="1"
                                type="text"
                                value={this.props.disabled ? '' : this.props.name}
                                onSubmit={this.props.onChangeName}
                            />
                        </Label>
                    </div>

                    <div className={styles.group}>
                        <div className={styles.iconWrapper}>
                            <img
                                className={classNames(styles.xIcon, styles.icon)}
                                src={xIcon}
                            />
                        </div>
                        <Label text="x">
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                placeholder="x"
                                tabIndex="2"
                                type="text"
                                value={this.props.disabled ? '' : this.props.x}
                                onSubmit={this.props.onChangeX}
                            />
                        </Label>
                    </div>

                    <div className={styles.group}>
                        <div className={styles.iconWrapper}>
                            <img
                                className={classNames(styles.yIcon, styles.icon)}
                                src={yIcon}
                            />
                        </div>
                        <Label text="y">
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                placeholder="y"
                                tabIndex="3"
                                type="text"
                                value={this.props.disabled ? '' : this.props.y}
                                onSubmit={this.props.onChangeY}
                            />
                        </Label>
                    </div>
                </div>

                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={styles.group}>
                        <Label
                            secondary
                            text="Show"
                        >
                            <div>
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
                                    tabIndex="4"
                                    onClick={this.props.onClickVisible}
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
                                    tabIndex="4"
                                    onClick={this.props.onClickNotVisible}
                                >
                                    <img
                                        className={styles.icon}
                                        src={hideIcon}
                                    />
                                </div>
                            </div>
                        </Label>
                    </div>
                    <div className={styles.group}>
                        <Label
                            secondary
                            text="Direction"
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label="Direction"
                                tabIndex="5"
                                type="text"
                                value={this.props.disabled ? '' : this.props.direction}
                                onSubmit={this.props.onChangeDirection}
                            />
                        </Label>
                    </div>
                    <div className={styles.group}>
                        <Label
                            secondary
                            text="Rotation"
                        >
                            <select
                                className={classNames(styles.selectForm, styles.rotationSelect)}
                                disabled={this.props.disabled}
                                value={this.props.rotationStyle}
                                onChange={this.props.onChangeRotationStyle}
                            >
                                {ROTATION_STYLES.map(style => (
                                    <option
                                        key={style}
                                        value={style}
                                    >
                                        {style}
                                    </option>
                                ))}
                            </select>
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
    name: PropTypes.string,
    onChangeDirection: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    onChangeX: PropTypes.func,
    onChangeY: PropTypes.func,
    onClickNotVisible: PropTypes.func,
    onClickVisible: PropTypes.func,
    rotationStyle: PropTypes.oneOf(ROTATION_STYLES),
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

export default SpriteInfo;
