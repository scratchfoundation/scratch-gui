import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';

class SixtyFPSToggler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleSixtyFPS'
        ]);
    }
    toggleSixtyFPS () {
        if (this.props.isSixty) {
            this.props.vm.setFramerate(30);
        } else {
            this.props.vm.setFramerate(60);
        }
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.toggleSixtyFPS, props);
    }
}

SixtyFPSToggler.propTypes = {
    children: PropTypes.func,
    isSixty: PropTypes.bool,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    isSixty: state.scratchGui.tw.framerate === 60,
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(SixtyFPSToggler);
