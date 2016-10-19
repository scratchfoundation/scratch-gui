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
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <StopAllComponent
                onClick={this.onClick}
                {...props}
            />
        );
    }
}

StopAll.propTypes = {
    vm: React.PropTypes.object
};

module.exports = StopAll;
