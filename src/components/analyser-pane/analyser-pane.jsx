import PropTypes from 'prop-types';
import React from 'react';
import {OrderedMap} from 'immutable';

import Box from '../box/box.jsx';
import ChartInfoComponent from '../chart-info/chart-info.jsx';
import ChartSelectorItemComponent from '../chart-selector-item/chart-selector-item.jsx';
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './analyser-pane.css';

const AnalyserPaneComponent = function (props) {
    const {
        charts,
        onExportChart,
        onSelectChart,
        onToggleVisible,
        stageSize,
        ...componentProps
    } = props;

    const enabledCharts = charts.valueSeq().filter(m => m.enable);

    return (
        <Box
            className={styles.analyserPane}
            onClick={onSelectChart}
            {...componentProps}
        >
            <ChartInfoComponent
                stageSize={stageSize}
            />
            <Box className={styles.itemsWrapper}>{
                enabledCharts.map(item => (
                    <ChartSelectorItemComponent
                        className={styles.chartWrapper}
                        color={item.color}
                        data={item.data}
                        id={item.id}
                        key={item.id}
                        label={item.label}
                        onClick={onSelectChart}
                        onExportButtonClick={onExportChart}
                        onVisibleCheckboxClick={onToggleVisible}
                        selected={item.selected}
                        stageSize={stageSize}
                        visible={item.visible}
                    />
                ))
            }</Box>
        </Box>
    );
};

AnalyserPaneComponent.propTypes = {
    charts: PropTypes.objectOf(OrderedMap),
    onExportChart: PropTypes.func,
    onSelectChart: PropTypes.func,
    onToggleVisible: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

export default AnalyserPaneComponent;
