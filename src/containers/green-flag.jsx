const bindAll = require('lodash.bindall');
const React = require('react');

const GreenFlagComponent = require('../components/green-flag.jsx');

class GreenFlag extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, ['onClick']);
    }
    onClick (e) {
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
                onClick={this.onClick}
                {...props}
            />
        );
    }
}

GreenFlag.propTypes = {
    vm: React.PropTypes.object
};

module.exports = GreenFlag;
