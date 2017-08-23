import bindAll from 'lodash.bindall';
import React from 'react';
import PropTypes from 'prop-types';

import monitorAdapter from '../lib/monitor-adapter.js';
import MonitorComponent from '../components/monitor/monitor.jsx';

class Monitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDragEnd'
        ]);
    }
    handleDragEnd (e, {x, y}) {
        this.props.onDragEnd(
            this.props.id,
            x,
            y
        );
    }
    render () {
        const monitorProps = monitorAdapter(this.props);
        return (
            <MonitorComponent
                {...monitorProps}
                onDragEnd={this.handleDragEnd}
            />
        );
    }
}

Monitor.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
    onDragEnd: PropTypes.func.isRequired,
    opcode: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    params: PropTypes.object, // eslint-disable-line react/no-unused-prop-types, react/forbid-prop-types
    value: PropTypes.string.isRequired // eslint-disable-line react/no-unused-prop-types
};

export default Monitor;
