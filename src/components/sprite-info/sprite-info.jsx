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
                <span className={styles.inputLabel}>
                    {props.name}
                </span>
                <input
                    className={classNames(styles.inputForm, styles.inputFormSpriteName)}
                    placeholder="Name"
                    type="text"
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
                        className={classNames(styles.showIcon, styles.icon)}
                        src={showIcon}
                    />
                    <img
                        className={classNames(styles.hideIcon, styles.icon)}
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
                        className={classNames(styles.draggableIcon, styles.icon)}
                        src={draggableIcon}
                    />
                    <img
                        className={classNames(styles.notDraggableIcon, styles.icon)}
                        src={notDraggableIcon}
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
                    <option value="clockwise">clockwise</option>
                    <option value="anchored">anchored</option>
                </select>
            </div>
        </div>
    </Box>
);

SpriteInfo.propTypes = {
    name: React.PropTypes.string
};

module.exports = SpriteInfo;
