import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleEnabled',
            'toggleWarpTimer'
        ]);
    }
    toggleEnabled () {
        this.props.vm.setCompilerOptions(Object.assign({}, this.props.compilerOptions, {
            enabled: !this.props.compilerOptions.enabled
        }));
    }
    toggleWarpTimer () {
        this.props.vm.setCompilerOptions(Object.assign({}, this.props.compilerOptions, {
            warpTimer: !this.props.compilerOptions.warpTimer
        }));
    }
    render () {
        return this.props.children({
            toggleEnabled: this.toggleEnabled,
            toggleWarpTimer: this.toggleWarpTimer,
            compilerOptions: this.props.compilerOptions,
            runtimeOptions: this.props.runtimeOptions
        });
    }
}

ToggleCompiler.propTypes = {
    children: PropTypes.func,
    compilerOptions: PropTypes.shape({
        enabled: PropTypes.bool,
        warpTimer: PropTypes.bool
    }),
    runtimeOptions: PropTypes.shape({
        maxClones: PropTypes.number
    }),
    vm: PropTypes.shape({
        setCompilerOptions: PropTypes.func,
        setRuntimeOptions: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    compilerOptions: state.scratchGui.tw.compilerOptions,
    runtimeOptions: state.scratchGui.tw.runtimeOptions
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ToggleCompiler);
