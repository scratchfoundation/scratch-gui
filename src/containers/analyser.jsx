import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {connect} from 'react-redux';
import Chart from 'chart.js/auto';

import AnalyserComponent from '../components/analyser/analyser.jsx';
import monitorAdapter from '../lib/monitor-adapter.js';
import {STAGE_DISPLAY_SIZES} from '../lib/layout-constants';
import { updateCharts } from '../reducers/charts';

const NOT_FOUND = -1;
const DATA_CACHE_LENGTH = 2 ** 10;

const CHART_CONFIG = {
    animation: false,
    interaction: {
        intersect: false,
    },
    scales: {
        x: {
            display: false
        },
        y: {
            suggestedMin: 0,
            suggestedMax: 1,
            grid: {
                color: ctx => ctx.tick.value === 0 ?
                    Chart.defaults.color :
                    Chart.defaults.borderColor
            },
        }
    },
    layout: {
        padding: 0
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            position: 'nearest'
        }
    }
};

const LINE_CONFIG = {
    fill: false,
    pointRadius: 0,
    spanGaps: true,
    tension: 0.2
};

const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Analyser extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleProjectStart',
        ]);
        this.canvas = document.createElement('canvas');
        this._usedColors = [];
    }
    componentDidMount () {
        this._chart = this.newChart();
        this.props.vm.runtime.on('PROJECT_START', this.handleProjectStart);
        this.props.vm.runtime.on('PROJECT_LOADED', this.handleProjectStart);
        this.update(true);
        this.start();
    }
    componentWillUnmount() {
        this.stop();
        this.props.vm.runtime.on('PROJECT_LOADED', this.handleProjectStart);
        this.props.vm.runtime.off('PROJECT_LOADED', this.handleProjectStart);
        this._chart.destroy();
    }
    shouldComponentUpdate (nextProps, nextState) {
        return this.props.stageSize !== nextProps.stageSize ||
            this.props.isFullScreen !== nextProps.isFullScreen;
    }
    _randomColor () {
        const h = randomInt(0, 24) * 15;
        const s = randomInt(0, 10) * 10;
        const l = randomInt(6, 12) * 5;
        const color = `hsl(${h}, ${s}%, ${l}%)`;
        if (this._usedColors.indexOf(color) === NOT_FOUND) {
            this._usedColors.push(color);
            return color;
        }
        return this._randomColor();
    }
    handleProjectStart () {
        this.update(true);
    }
    start () {
        const step = typeof this.props.vm.runtime._step['@original'] === 'function' ?
            this.props.vm.runtime._step['@original'] :
            this.props.vm.runtime._step.bind(this.props.vm.runtime);
        this.props.vm.runtime._step = () => {
            step();
            this.update();
        }
        this.props.vm.runtime._step['@original'] = step;
    }
    stop () {
        this.props.vm.runtime._step = this.props.vm.runtime._step['@original'];
    }
    newChart () {
        if (this._chart) {
            return this._chart;
        }

        this._analyserWidth = this.props.vm.runtime.constructor.STAGE_WIDTH;

        this.props.onChartsUpdate(this.props.charts
            .map(analyserData => {
                analyserData.index = NOT_FOUND;
                return analyserData;
            }));

        return new Chart(this.canvas, {
            type: 'line',
            options: CHART_CONFIG,
            data: {
                labels: new Array(this._analyserWidth).fill(''),
                datasets: []
            }
        });
    }
    update (renew) {
        if (!this._chart) return;

        this.props.onChartsUpdate(this.props.monitors
            .map(monitorData => {
                const monitorProps = monitorAdapter({
                    id: monitorData.id,
                    opcode: monitorData.opcode,
                    params: monitorData.params,
                    spriteName: monitorData.spriteName,
                    value: monitorData.value,
                    vm: this.props.vm
                });

                const analyserData = this.props.charts.get(monitorProps.id) || {
                    color: this._randomColor(),
                    chart: new Array(this._analyserWidth).fill(NaN),
                    data: new Array(),
                    id: monitorProps.id,
                    index: NOT_FOUND,
                    label: monitorProps.label,
                    visible: monitorData.visible
                };
                analyserData.enable = monitorData.visible;

                if (renew || !monitorData.visible) {
                    analyserData.chart.fill(NaN);
                    analyserData.data.length = 0;
                } else {
                    analyserData.chart.shift();
                    analyserData.chart.push(monitorProps.value);
                    analyserData.data.push(monitorProps.value);
                    if (analyserData.data.length > DATA_CACHE_LENGTH) {
                        analyserData.data.shift();
                    }
                }

                if (analyserData.index === NOT_FOUND) {
                    analyserData.index = this._chart.data.datasets.push({
                        backgroundColor: analyserData.color,
                        borderColor: analyserData.color,
                        data: analyserData.chart,
                        label: analyserData.label,
                        ...LINE_CONFIG
                    }) - 1;
                }

                this._chart.data.datasets[analyserData.index].hidden =
                    !(analyserData.enable && analyserData.visible);
                this._chart.data.datasets[analyserData.index].borderWidth =
                    this.props.isFullScreen ? 3 : (this.props.stageSize === 'large' ? 2 : 1);

                if (analyserData.selected) {
                    this._chart.data.datasets[analyserData.index].borderWidth += 1;
                }

                return analyserData;
            }));

        this._chart.update();
    }
    render () {
        const {
            onChartsUpdate,
            ...componentProps
        } = this.props
        return (
            <AnalyserComponent
                canvas={this.canvas}
                {...componentProps}
            />
        );
    }
}

Analyser.propTypes = {
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    onChartsUpdate: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    charts: state.scratchGui.charts,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    monitors: state.scratchGui.monitors
});

const mapDispatchToProps = dispatch => ({
    onChartsUpdate: charts => {
        dispatch(updateCharts(charts));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Analyser);
