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
                        onClick={props.onChangeVisibility}
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
                        onClick={props.onChangeDraggability}
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
                        onClick={props.onChangeDraggability}
                    />
                </div>
            </div>

            <div className={styles.group}>
                <span className={styles.inputLabelSmall}>
                    Rotation
                </span>
                <select
                    className={classNames(styles.selectForm, styles.inputFormRotationSelect)}
                >
                    <option value="left-right">left-right</option>
                    <option value="clockwise">don&#39;t rotate</option>
                    <option value="anchored">all around</option>
                </select>
            </div>
        </div>
    </Box>
);

SpriteInfo.propTypes = {
    draggable: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChangeDraggability: React.PropTypes.func,
    onChangeName: React.PropTypes.func,
    onChangeVisibility: React.PropTypes.func,
    onChangeX: React.PropTypes.func,
    onChangeY: React.PropTypes.func,
    visible: React.PropTypes.bool,
    x: React.PropTypes.number,
    y: React.PropTypes.number
};

SpriteInfo.defaultProps = {
    name: ''
};

module.exports = SpriteInfo;
