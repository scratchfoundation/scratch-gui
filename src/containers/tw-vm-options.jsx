import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCompilerEnabled',
            'toggleInfiniteClones',
            'toggleInterpolation',
            'toggleWarpTimer'
        ]);
    }
    toggleCompilerEnabled () {
        this.props.vm.setCompilerOptions({
            enabled: !this.props.compilerOptions.enabled
        });
    }
    toggleWarpTimer () {
        this.props.vm.setCompilerOptions({
            warpTimer: !this.props.compilerOptions.warpTimer
        });
    }
    toggleInfiniteClones () {
        this.props.vm.setRuntimeOptions({
            maxClones: this.props.runtimeOptions.maxClones === Infinity ? 300 : Infinity
        });
    }
    toggleInterpolation () {
        this.props.vm.setInterpolation(!this.props.interpolation);
    }
    render () {
        return this.props.children({
            compilerEnabled: this.props.compilerOptions.enabled,
            toggleCompilerEnabled: this.toggleCompilerEnabled,
            warpTimer: this.props.compilerOptions.warpTimer,
            toggleWarpTimer: this.toggleWarpTimer,
            infiniteClones: this.props.runtimeOptions.maxClones === Infinity,
            toggleInfiniteClones: this.toggleInfiniteClones,
            interpolation: this.props.interpolation,
            toggleInterpolation: this.toggleInterpolation
        });
    }
}

ToggleCompiler.propTypes = {
    children: PropTypes.func,
    compilerOptions: PropTypes.shape({
        enabled: PropTypes.bool,
        warpTimer: PropTypes.bool
    }),
    interpolation: PropTypes.bool,
    runtimeOptions: PropTypes.shape({
        maxClones: PropTypes.number
    }),
    vm: PropTypes.shape({
        setCompilerOptions: PropTypes.func,
        setInterpolation: PropTypes.func,
        setRuntimeOptions: PropTypes.func
    })
};

const mapStateToProps = state => ({
    compilerOptions: state.scratchGui.tw.compilerOptions,
    interpolation: state.scratchGui.tw.interpolation,
    runtimeOptions: state.scratchGui.tw.runtimeOptions,
    vm: state.scratchGui.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ToggleCompiler);
