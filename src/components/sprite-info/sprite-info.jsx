import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import Box from '../box/box.jsx';
import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';

import layout from '../../lib/layout-constants.js';
import styles from './sprite-info.css';

import xIcon from './icon--x.svg';
import yIcon from './icon--y.svg';
import showIcon from './icon--show.svg';
import hideIcon from './icon--hide.svg';

const BufferedInput = BufferedInputHOC(Input);

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.direction !== nextProps.direction ||
            this.props.disabled !== nextProps.disabled ||
            this.props.name !== nextProps.name ||
            this.props.size !== nextProps.size ||
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
                                className={styles.spriteInput}
                                disabled={this.props.disabled}
                                placeholder="Name"
                                tabIndex="0"
                                type="text"
                                value={this.props.disabled ? '' : this.props.name}
                                onSubmit={this.props.onChangeName}
                            />
                        </Label>
                    </div>

                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <div className={styles.iconWrapper}>
                                <img
                                    aria-hidden="true"
                                    className={classNames(styles.xIcon, styles.icon)}
                                    src={xIcon}
                                />
                            </div>
                        </MediaQuery>
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

                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <div className={styles.iconWrapper}>
                                <img
                                    aria-hidden="true"
                                    className={classNames(styles.yIcon, styles.icon)}
                                    src={yIcon}
                                />
                            </div>
                        </MediaQuery>
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
                </div>

                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={styles.group}>
                        <MediaQuery minWidth={layout.fullSizeMinWidth}>
                            <Label
                                secondary
                                text="Show"
                            />
                        </MediaQuery>
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
                            text="Size"
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label="Size"
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
                            text="Direction"
                        >
                            <BufferedInput
                                small
                                disabled={this.props.disabled}
                                label="Direction"
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
