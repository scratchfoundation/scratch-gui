const bindAll = require('lodash.bindall');
const React = require('react');
const VM = require('scratch-vm');

const StopAllComponent = require('../components/stop-all/stop-all.jsx');

class StopAll extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleClick']);
    }
    handleClick (e) {
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
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

StopAll.propTypes = {
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = StopAll;
