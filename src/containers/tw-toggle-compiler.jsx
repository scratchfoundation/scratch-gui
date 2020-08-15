import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCompiler'
        ]);
    }
    toggleCompiler () {
        // todo: translate
        if (this.props.isProjectRunning) {
            alert('Stop the project first');
        } else {
            this.props.vm.setCompilerEnabled(!this.props.compilerEnabled);
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
        return this.props.children(this.toggleCompiler, props);
    }
}

ToggleCompiler.propTypes = {
    children: PropTypes.func,
    compilerEnabled: PropTypes.bool,
    isProjectRunning: PropTypes.bool,
    vm: PropTypes.shape({
        setCompilerEnabled: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    compilerEnabled: state.scratchGui.tw.compiler,
    isProjectRunning: state.scratchGui.vmStatus.running
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ToggleCompiler);
