import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import VM from 'scratch-vm';
import AutoSaveAPI from '../lib/tw-indexeddb-autosave-api';
import {closeFileMenu} from '../reducers/menus';
import {closeLoadingProject, openLoadingProject} from '../reducers/modals';
import {onLoadedProject, requestProjectUpload} from '../reducers/project-state';

class ToggleCompiler extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'loadAutoSave'
        ]);
    }
    loadAutoSave () {
        this.props.onLoadingStarted();
        this.props.requestProjectUpload(this.props.loadingState);
        AutoSaveAPI.load()
            .then(arrayBuffer => this.props.vm.loadProject(arrayBuffer))
            .then(() => {
                this.props.onLoadingFinished(this.props.loadingState);
            })
            .catch(error => {
                // eslint-disable-next-line no-alert
                alert(error);
            });
    }
    render () {
        return this.props.children(
            this.props.className,
            this.loadAutoSave
        );
    }
}

ToggleCompiler.propTypes = {
    children: PropTypes.func,
    className: PropTypes.string,
    loadingState: PropTypes.string,
    onLoadingStarted: PropTypes.func,
    onLoadingFinished: PropTypes.func,
    requestProjectUpload: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    loadingState: state.scratchGui.projectState.loadingState,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onLoadingFinished: loadingState => {
        dispatch(onLoadedProject(loadingState, false, true));
        dispatch(closeLoadingProject());
        dispatch(closeFileMenu());
    },
    requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
    onLoadingStarted: () => dispatch(openLoadingProject())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToggleCompiler);
