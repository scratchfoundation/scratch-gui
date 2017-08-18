import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import GreenFlagComponent from '../components/green-flag/green-flag.jsx';

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
        this.props.vm.addListener('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.addListener('PROJECT_RUN_STOP', this.onProjectRunStop);
    }
    componentWillUnmount () {
        this.props.vm.removeListener('PROJECT_RUN_START', this.onProjectRunStart);
        this.props.vm.removeListener('PROJECT_RUN_STOP', this.onProjectRunStop);
    }
    onProjectRunStart () {
        this.setState({projectRunning: true});
    }
    onProjectRunStop () {
        this.setState({projectRunning: false});
    }
    handleClick (e) {
        e.preventDefault();
        if (e.shiftKey) {
            this.props.vm.setTurboMode(!this.props.vm.runtime.turboMode);
        } else {
            this.props.vm.greenFlag();
        }
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
    vm: PropTypes.instanceOf(VM)
};

export default GreenFlag;
