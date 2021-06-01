import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import VM from 'scratch-vm';
import {closeFileMenu} from '../reducers/menus';
import {closeLoadingProject, openLoadingProject} from '../reducers/modals';
import {onLoadedProject, requestProjectUpload} from '../reducers/project-state';
import RestorePointAPI from '../lib/tw-restore-point-api';
import analytics from '../lib/analytics';

const messages = defineMessages({
    error: {
        defaultMessage: 'Could not load restore point.\n\nDebug: {error}',
        description: 'Alert displayed when restore point loading failed',
        id: 'tw.restorePoint.loadFail'
    }
});

class RestorePointLoader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'loadRestorePoint'
        ]);
    }
    loadRestorePoint () {
        this.props.onLoadingStarted();
        this.props.requestProjectUpload(this.props.loadingState);
        RestorePointAPI.load()
            .then(arrayBuffer => this.props.vm.loadProject(arrayBuffer))
            .then(() => {
                this.props.onLoadingFinished(this.props.loadingState, true);
            })
            .catch(error => {
                this.props.onLoadingFinished(this.props.loadingState, false);
                // eslint-disable-next-line no-alert
                alert(this.props.intl.formatMessage(messages.error, {
                    error
                }));
            });
    }
    render () {
        return this.props.children(
            this.props.className,
            this.loadRestorePoint
        );
    }
}

RestorePointLoader.propTypes = {
    intl: intlShape,
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
    onLoadingFinished: (loadingState, success) => {
        dispatch(onLoadedProject(loadingState, false, success));
        dispatch(closeLoadingProject());
        dispatch(closeFileMenu());
    },
    requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
    onLoadingStarted: () => dispatch(openLoadingProject())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(RestorePointLoader));
