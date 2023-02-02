import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import {FormattedMessage} from 'react-intl';

import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants.js';

import styles from './chart-info.css';

const ChartInfoComponent = props => (
    <Box className={styles.chartInfo}>
        <div className={styles.row}>
            <div className={styles.headerTitle}>
                <FormattedMessage
                    defaultMessage="Data"
                    description="Chart info current data label"
                    id="gui.chartInfo.data"
                />
            </div>
        </div>
    </Box>
);

ChartInfoComponent.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
};

export default ChartInfoComponent;
