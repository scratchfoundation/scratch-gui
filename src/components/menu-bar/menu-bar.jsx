const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const scratchLogo = require('./scratch-logo.svg');

const MenuBar = function MenuBar () {
    return (
        <Box
            className={classNames({
                [styles.menuBar]: true
            })}
        >
            <div className={styles.logoWrapper}>
                <img
                    className={styles.scratchLogo}
                    src={scratchLogo}
                />
            </div>

            <span className={styles.title}>Animation Playtest Prototype</span>
        </Box>
    );
};

module.exports = MenuBar;
