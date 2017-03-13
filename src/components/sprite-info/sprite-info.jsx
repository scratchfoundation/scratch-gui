const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./sprite-info.css');

const xIcon = require('./icon--x.svg');
const yIcon = require('./icon--y.svg');
const showIcon = require('./icon--show.svg');
const hideIcon = require('./icon--hide.svg');
const draggableIcon = require('./icon--draggable-on.svg');
const notDraggableIcon = require('./icon--draggable-off.svg');

const ROTATION_STYLES = ['left-right', 'don\'t rotate', 'all around'];

class SpriteInfo extends React.Component {
    shouldComponentUpdate (nextProps) {
        return (
            this.props.disabled !== nextProps.disabled ||
            this.props.draggable !== nextProps.draggable ||
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
                        <span className={styles.inputLabel}>Sprite</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                            disabled={this.props.disabled}
                            placeholder="Name"
                            tabIndex="1"
                            type="text"
                            value={this.props.disabled ? '' : this.props.name}
                            onBlur={this.props.onBlurName}
                            onChange={this.props.onChangeName}
                            onKeyPress={this.props.onKeyPress}
                        />
                    </div>

                    <div className={styles.group}>
                        <div className={styles.iconWrapper}>
                            <img
                                className={classNames(styles.xIcon, styles.icon)}
                                src={xIcon}
                            />
                        </div>
                        <span className={styles.inputLabel}>x</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormX)}
                            disabled={this.props.disabled}
                            placeholder="x"
                            tabIndex="2"
                            type="text"
                            value={this.props.disabled ? '' : this.props.x}
                            onBlur={this.props.onBlurX}
                            onChange={this.props.onChangeX}
                            onKeyPress={this.props.onKeyPress}
                        />
                    </div>

                    <div className={styles.group}>
                        <div className={styles.iconWrapper}>
                            <img
                                className={classNames(styles.yIcon, styles.icon)}
                                src={yIcon}
                            />
                        </div>
                        <span className={styles.inputLabel}>y</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormY)}
                            disabled={this.props.disabled}
                            placeholder="y"
                            tabIndex="3"
                            type="text"
                            value={this.props.disabled ? '' : this.props.y}
                            onBlur={this.props.onBlurY}
                            onChange={this.props.onChangeY}
                            onKeyPress={this.props.onKeyPress}
                        />
                    </div>
                </div>

                <div className={classNames(styles.row, styles.rowSecondary)}>
                    <div className={styles.group}>
                        <span className={styles.inputLabelSmall}>
                            Show
                        </span>
                        <div className={classNames(styles.radioButton, {[styles.isDisabled]: this.props.disabled})}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLeft,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: this.props.visible && !this.props.disabled
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
                                        [styles.isActive]: !this.props.visible && !this.props.disabled
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
                    </div>

                    <div className={styles.group}>
                        <span className={styles.inputLabelSmall}>
                            Draggable
                        </span>
                        <div className={classNames(styles.radioButton, {[styles.isDisabled]: this.props.disabled})}>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioLeft,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: this.props.draggable && !this.props.disabled
                                    }
                                )}
                                tabIndex="5"
                                onClick={this.props.onClickDraggable}
                            >
                                <img
                                    className={styles.icon}
                                    src={draggableIcon}
                                />
                            </div>
                            <div
                                className={classNames(
                                    styles.radio,
                                    styles.radioRight,
                                    styles.iconWrapper,
                                    {
                                        [styles.isActive]: !this.props.draggable && !this.props.disabled
                                    }
                                )}
                                tabIndex="6"
                                onClick={this.props.onClickNotDraggable}
                            >
                                <img
                                    className={styles.icon}
                                    src={notDraggableIcon}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.group}>
                        <span className={styles.inputLabelSmall}>
                            Rotation
                        </span>
                        <select
                            className={classNames(styles.selectForm, styles.inputFormRotationSelect)}
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
                    </div>
                </div>
            </Box>
        );
    }
}

SpriteInfo.propTypes = {
    disabled: React.PropTypes.bool,
    draggable: React.PropTypes.bool,
    name: React.PropTypes.string,
    onBlurName: React.PropTypes.func,
    onBlurX: React.PropTypes.func,
    onBlurY: React.PropTypes.func,
    onChangeName: React.PropTypes.func,
    onChangeRotationStyle: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
    onClickDraggable: React.PropTypes.func,
    onClickNotDraggable: React.PropTypes.func,
    onClickNotVisible: React.PropTypes.func,
    onClickVisible: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    rotationStyle: React.PropTypes.oneOf(ROTATION_STYLES),
    visible: React.PropTypes.bool,
    x: React.PropTypes.string,
    y: React.PropTypes.string
};

module.exports = SpriteInfo;
