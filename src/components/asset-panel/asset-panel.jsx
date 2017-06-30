const React = require('react');

const Box = require('../box/box.jsx');
const Selector = require('./selector.jsx');
const styles = require('./asset-panel.css');

const AssetPanel = props => (
    <Box className={styles.wrapper}>
        <Selector
            className={styles.selector}
            {...props}
        />
        <Box className={styles.detailArea}>
            {props.children}
        </Box>
    </Box>
);

AssetPanel.propTypes = {
    ...Selector.propTypes
};

module.exports = AssetPanel;
