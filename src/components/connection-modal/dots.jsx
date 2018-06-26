import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';
import styles from './connection-modal.css';

const Dots = props => (
    <Box className={styles.dots}>
        <div>{'step: '}{props.counter}{' / '}{props.total}</div>
    </Box>
);

Dots.propTypes = {
    counter: PropTypes.number,
    total: PropTypes.number
};

export default Dots;
