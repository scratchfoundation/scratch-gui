const bindAll = require('lodash.bindall');
const React = require('react');

const VM = require('scratch-vm');

const GreenFlagComponent = require('../components/green-flag/green-flag.jsx');

class GreenFlag extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'onProjectRunStart',
            'onProjectRunStop'
        ]);
        this.state = {projectRunning: false};
    }
    componentDidMount () {
        this.props.vm.on('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.on('PROJECT_RUN_STOP', this.onProjectRunStop);
    }
    componentWillUnmount () {
        this.props.vm.off('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.off('PROJECT_RUN_STOP', this.onProjectRunStop);
    }
    onProjectRunStart () {
        this.setState({projectRunning: true});
    }
    onProjectRunStop () {
        this.setState({projectRunning: false});
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
                active={this.state.projectRunning}
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
