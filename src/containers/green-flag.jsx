const bindAll = require('lodash.bindall');
const React = require('react');

const VM = require('scratch-vm');

const GreenFlagComponent = require('../components/green-flag.jsx');

class GreenFlag extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['handleClick']);
    }
    handleClick (e) {
        e.preventDefault();
        this.props.vm.greenFlag();
    }
    render () {
        const {
            vm, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        return (
            <GreenFlagComponent
                onClick={this.handleClick}
                {...props}
            />
        );
    }
}

GreenFlag.propTypes = {
    vm: React.PropTypes.instanceOf(VM)
};

module.exports = GreenFlag;
