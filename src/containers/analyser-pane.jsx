import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import AnalyserPaneComponent from '../components/analyser-pane/analyser-pane.jsx';
import downloadBlob from '../lib/download-blob';
import { updateCharts } from '../reducers/charts';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';

class AnalyserPane extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleExportChart',
            'handleSelectChart',
            'handleToggleVisible'
        ]);
    }
    handleExportChart (id) {
        if (!this.props.charts.has(id)) return;

        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        const chart = this.props.charts.get(id);
        const data = chart.data.reduce(
            (ctx, m, i) => `${ctx}\n${i+1},${m}`,
            `#,${chart.label}`
        );
        const content = new Blob([data], {
            type: 'text/csv'
        })
        downloadBlob(`${chart.label}.csv`, content);
    }
    handleSelectChart (id) {
        this.props.onChartsUpdate(this.props.charts
            .map(analyserData => {
                analyserData.selected = analyserData.id === id;
                return analyserData;
            }));
    }
    handleToggleVisible (id) {
        if (!this.props.charts.has(id)) return;

        const chart = this.props.charts.get(id);
        chart.visible = !chart.visible;
        this.props.charts.set(id, chart);
        this.props.onChartsUpdate(this.props.charts);
    }
    render () {
        const {
            onChartsUpdate,
            ...componentProps
        } = this.props
        return (
            <AnalyserPaneComponent
                {...componentProps}
                onExportChart={this.handleExportChart}
                onSelectChart={this.handleSelectChart}
                onToggleVisible={this.handleToggleVisible}
            />
        );
    }
}

AnalyserPane.propTypes = {
    onChartsUpdate: PropTypes.func,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

const mapStateToProps = state => ({
    charts: state.scratchGui.charts
});

const mapDispatchToProps = dispatch => ({
    onChartsUpdate: charts => {
        dispatch(updateCharts(charts));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalyserPane);
