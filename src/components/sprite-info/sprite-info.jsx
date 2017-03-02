const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./sprite-info.css');

const xIcon = require('./icon--x.svg');
const yIcon = require('./icon--y.svg');
const showIcon = require('./icon--show.svg');
const hideIcon = require('./icon--hide.svg');
const draggableIcon = require('./icon--draggable.svg');
const notDraggableIcon = require('./icon--not-draggable.svg');

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
                <div className={styles.row}>
                    <div className={styles.group}>
                        <span className={styles.inputLabel}>Sprite</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                            disabled={this.props.disabled}
                            placeholder="Name"
                            type="text"
                            value={this.props.disabled ? '' : this.props.name}
                            onChange={this.props.onChangeName}
                        />
                    </div>

                    <div className={styles.group}>
                        <img
                            className={classNames(styles.xIcon, styles.icon)}
                            src={xIcon}
                        />
                        <span className={styles.inputLabel}>x</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormX)}
                            disabled={this.props.disabled}
                            placeholder="x"
                            type="text"
                            value={this.props.disabled ? '' : this.props.x}
                            onChange={this.props.onChangeX}
                        />
                    </div>

                    <div className={styles.group}>
                        <img
                            className={classNames(styles.yIcon, styles.icon)}
                            src={yIcon}
                        />
                        <span className={styles.inputLabel}>y</span>
                        <input
                            className={classNames(styles.inputForm, styles.inputFormY)}
                            disabled={this.props.disabled}
                            placeholder="y"
                            type="text"
                            value={this.props.disabled ? '' : this.props.y}
                            onChange={this.props.onChangeY}
                        />
                    </div>
                </div>


                <div className={styles.row}>
                    <div className={styles.group}>
                        <span className={styles.inputLabelSmall}>
                            Show
                        </span>
                        <div className={classNames(styles.radioBox, {[styles.isDisabled]: this.props.disabled})}>
                            <img
                                className={classNames(
                                    styles.icon,
                                    styles.showIcon,
                                    {
                                        [styles.isActive]: this.props.visible && !this.props.disabled
                                    }
                                )}
                                src={showIcon}
                                onClick={this.props.onClickVisible}
                            />
                            <img
                                className={classNames(
                                    styles.icon,
                                    styles.hideIcon,
                                    {
                                        [styles.isActive]: !this.props.visible && !this.props.disabled
                                    }
                                )}
                                src={hideIcon}
                                onClick={this.props.onClickNotVisible}
                            />
                        </div>
                    </div>

                    <div className={styles.group}>
                        <span className={styles.inputLabelSmall}>
                            Draggable
                        </span>
                        <div className={classNames(styles.radioBox, {[styles.isDisabled]: this.props.disabled})}>
                            <img
                                className={classNames(
                                    styles.icon,
                                    styles.draggableIcon,
                                    {
                                        [styles.isActive]: this.props.draggable && !this.props.disabled
                                    }
                                )}
                                src={draggableIcon}
                                onClick={this.props.onClickDraggable}
                            />
                            <img
                                className={classNames(
                                    styles.icon,
                                    styles.notDraggableIcon,
                                    {
                                        [styles.isActive]: !this.props.draggable && !this.props.disabled
                                    }
                                )}
                                src={notDraggableIcon}
                                onClick={this.props.onClickNotDraggable}
                            />
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
    onChangeName: React.PropTypes.func,
    onChangeRotationStyle: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
    onClickDraggable: React.PropTypes.func,
    onClickNotDraggable: React.PropTypes.func,
    onClickNotVisible: React.PropTypes.func,
    onClickVisible: React.PropTypes.func,
    rotationStyle: React.PropTypes.oneOf(ROTATION_STYLES),
    visible: React.PropTypes.bool,
    x: React.PropTypes.number,
    y: React.PropTypes.number
};

module.exports = SpriteInfo;
