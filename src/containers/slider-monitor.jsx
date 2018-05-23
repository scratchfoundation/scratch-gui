import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';
import {setVariableValue} from '../lib/variable-utils';
import {connect} from 'react-redux';

import SliderMonitorComponent from '../components/monitor/slider-monitor.jsx';

class SliderMonitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSliderUpdate'
        ]);

        this.state = {
            value: Number(props.value)
        };
    }
    componentWillReceiveProps (nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({value: nextProps.value});
        }
    }
    handleSliderUpdate (e) {
        this.setState({value: Number(e.target.value)});
        const {vm, targetId, id: variableId} = this.props;
        setVariableValue(vm, targetId, variableId, Number(e.target.value));
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            value, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <SliderMonitorComponent
                {...props}
                value={this.state.value}
                onSliderUpdate={this.handleSliderUpdate}
            />
        );
    }
}

SliderMonitor.propTypes = {
    id: PropTypes.string,
    targetId: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({vm: state.scratchGui.vm});

export default connect(mapStateToProps)(SliderMonitor);
