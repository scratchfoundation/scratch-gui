const React = require('react');
const Box = require('../box/box.jsx');
const styles = require('./blocks.css');

const BlocksComponent = props => {
    const {
        componentRef,
        ...componentProps
    } = props;
    return (
        <Box
            className={styles.blocks}
            componentRef={componentRef}
            {...componentProps}
        />
    );
};
BlocksComponent.propTypes = {
    componentRef: React.PropTypes.func
};
module.exports = BlocksComponent;
