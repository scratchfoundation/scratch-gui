const bindAll = require('lodash.bindall');
const React = require('react');

const StopAllComponent = require('../components/stop-all');

class StopAll extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onClick']);
    }
    onClick (e) {
        e.preventDefault();
        this.props.vm.stopAll();
    }
    render () {
        return (
            <StopAllComponent
                onClick={this.onClick}
                {... this.props}
            />
        );
    }
}

StopAll.propTypes = {
    vm: React.PropTypes.object
};

module.exports = StopAll;
