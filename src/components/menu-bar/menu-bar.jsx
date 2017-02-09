const classNames = require('classnames');
const React = require('react');

const Box = require('../box/box.jsx');
const styles = require('./menu-bar.css');
const scratchLogo = require('./scratch-logo.svg');

const MenuBar = props => (
    <Box
        className={classNames({
            [styles.menuBar]: true
        })}
    >
        <div className={styles.logoWrapper}>
            <img
                alt={props.name}
                className={styles.scratchLogo}
                src={scratchLogo}
            />
        </div>

        <span className={styles.title}>Animation Playtest Prototype</span>
    </Box>
);

MenuBar.propTypes = {
    name: React.PropTypes.string
};

module.exports = MenuBar;
