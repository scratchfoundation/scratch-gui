import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'toggleCompilerEnabled',
            'toggleWarpTimer',
            'toggleInfiniteClones'
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
    render () {
        return this.props.children({
            compilerEnabled: this.props.compilerOptions.enabled,
            toggleCompilerEnabled: this.toggleCompilerEnabled,
            warpTimer: this.props.compilerOptions.warpTimer,
            toggleWarpTimer: this.toggleWarpTimer,
            infiniteClones: this.props.runtimeOptions.maxClones === Infinity,
            toggleInfiniteClones: this.toggleInfiniteClones
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
