import bindAll from 'lodash.bindall';
import React from 'react';

import {connect} from 'react-redux';

import MonitorListComponent from '../components/monitor-list/monitor-list.jsx';

class MonitorList extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMonitorChange'
        ]);
    }
    handleMonitorChange (id, x, y) { // eslint-disable-line no-unused-vars
        // @todo send this event to the VM
    }
    render () {
        return (
            <MonitorListComponent
                onMonitorChange={this.handleMonitorChange}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = state => ({
    monitors: state.monitors
});
const mapDispatchToProps = () => ({});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorList);
