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

const SpriteInfo = props => (
    <Box
        className={styles.spriteInfo}
    >
        <div className={styles.row}>
            <div className={styles.group}>
                <span className={styles.inputLabel}>Sprite</span>
                <input
                    className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                    placeholder="Name"
                    type="text"
                    value={props.name}
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
                    placeholder="x"
                    type="text"
                    value={typeof props.x === 'undefined' ? '' : props.x}
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
                    placeholder="y"
                    type="text"
                    value={typeof props.y === 'undefined' ? '' : props.y}
                    onChange={props.onChangeY}
                />
            </div>
        </div>


        <div className={styles.row}>
            <div className={styles.group}>
                <span className={styles.inputLabelSmall}>
                    Show
                </span>
                <div className={styles.radioBox}>
                    <img
                        className={classNames(
                            styles.icon,
                            styles.showIcon,
                            {
                                [styles.isActive]: props.visible
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
                                [styles.isActive]: !props.visible
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
                <div className={styles.radioBox}>
                    <img
                        className={classNames(
                            styles.icon,
                            styles.draggableIcon,
                            {
                                [styles.isActive]: props.draggable
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
                                [styles.isActive]: !props.draggable
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

SpriteInfo.defaultProps = {
    name: ''
};

module.exports = SpriteInfo;
