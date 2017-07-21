import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import styles from './blocks.css';

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
    componentRef: PropTypes.func
};
export default BlocksComponent;
