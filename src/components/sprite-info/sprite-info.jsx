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

const SpriteInfo = props => {
    const nameDisabled = typeof props.name === 'undefined';
    const xDisabled = typeof props.x === 'undefined';
    const yDisabled = typeof props.y === 'undefined';
    const visibleDisabled = typeof props.visible === 'undefined';
    const draggableDisabled = typeof props.draggable === 'undefined';
    const rotationStyleDisabled = typeof props.rotationStyle === 'undefined';
    return (
        <Box
            className={styles.spriteInfo}
        >
            <div className={styles.row}>
                <div className={styles.group}>
                    <span className={styles.inputLabel}>Sprite</span>
                    <input
                        className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                        disabled={nameDisabled}
                        placeholder="Name"
                        type="text"
                        value={nameDisabled ? '' : props.name}
                        onChange={props.onChangeName}
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
                        disabled={xDisabled}
                        placeholder="x"
                        type="text"
                        value={xDisabled ? '' : props.x}
                        onChange={props.onChangeX}
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
                        disabled={yDisabled}
                        placeholder="y"
                        type="text"
                        value={yDisabled ? '' : props.y}
                        onChange={props.onChangeY}
                    />
                </div>
            </div>


            <div className={styles.row}>
                <div className={styles.group}>
                    <span className={styles.inputLabelSmall}>
                        Show
                    </span>
                    <div className={classNames(styles.radioBox, {[styles.isDisabled]: visibleDisabled})}>
                        <img
                            className={classNames(
                                styles.icon,
                                styles.showIcon,
                                {
                                    [styles.isActive]: props.visible && !visibleDisabled
                                }
                            )}
                            src={showIcon}
                            onClick={props.onClickVisible}
                        />
                        <img
                            className={classNames(
                                styles.icon,
                                styles.hideIcon,
                                {
                                    [styles.isActive]: !props.visible && !visibleDisabled
                                }
                            )}
                            src={hideIcon}
                            onClick={props.onClickNotVisible}
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <span className={styles.inputLabelSmall}>
                        Draggable
                    </span>
                    <div className={classNames(styles.radioBox, {[styles.isDisabled]: visibleDisabled})}>
                        <img
                            className={classNames(
                                styles.icon,
                                styles.draggableIcon,
                                {
                                    [styles.isActive]: props.draggable && !draggableDisabled
                                }
                            )}
                            src={draggableIcon}
                            onClick={props.onClickDraggable}
                        />
                        <img
                            className={classNames(
                                styles.icon,
                                styles.notDraggableIcon,
                                {
                                    [styles.isActive]: !props.draggable && !draggableDisabled
                                }
                            )}
                            src={notDraggableIcon}
                            onClick={props.onClickNotDraggable}
                        />
                    </div>
                </div>

                <div className={styles.group}>
                    <span className={styles.inputLabelSmall}>
                        Rotation
                    </span>
                    <select
                        className={classNames(styles.selectForm, styles.inputFormRotationSelect)}
                        disabled={rotationStyleDisabled}
                        value={props.rotationStyle}
                        onChange={props.onChangeRotationStyle}
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
};

SpriteInfo.propTypes = {
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
