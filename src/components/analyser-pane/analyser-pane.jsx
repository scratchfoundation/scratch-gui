import PropTypes from 'prop-types';
import React from 'react';

import ChartSelectorComponent from '../chart-selector/chart-selector.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './analyser-pane.css';

const AnalyserPane = ({
    charts,
    onExportChart,
    onSelectChart,
    onToggleVisible,
    stageSize,
    ...componentProps
}) => (
    <div
        className={styles.analyserPane}
        {...componentProps}
    >
        <ChartSelectorComponent
            charts={charts}
            onExportChart={onExportChart}
            onSelectChart={onSelectChart}
            onToggleVisible={onToggleVisible}
            stageSize={stageSize}
        />
    </div>
);

AnalyserPane.propTypes = {
    onExportChart: PropTypes.func,
    onSelectChart: PropTypes.func,
    onToggleVisible: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
};

export default AnalyserPane;
