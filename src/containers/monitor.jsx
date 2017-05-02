const bindAll = require('lodash.bindall');
const React = require('react');

const MonitorComponent = require('../components/monitor/monitor.jsx');

class Monitor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDragEnd'
        ]);
    }
    handleDragEnd (_, {x, y}) {
        this.props.onDragEnd(
            this.props.id,
            x,
            y
        );
    }
    render () {
        return (
            <MonitorComponent
                {...this.props}
                onDragEnd={this.handleDragEnd}
            />
        );
    }
}

Monitor.propTypes = MonitorComponent.propTypes;

module.exports = Monitor;
