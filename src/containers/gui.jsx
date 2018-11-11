import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import {openExtensionLibrary} from '../reducers/modals';
import {
    getIsError,
    getIsShowingProject
} from '../reducers/project-state';
import {setProjectTitle} from '../reducers/project-title';
import {
    activateTab,
    BLOCKS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX
} from '../reducers/editor-tab';

import {
    closeCostumeLibrary,
    closeBackdropLibrary
} from '../reducers/modals';

import FontLoaderHOC from '../lib/font-loader-hoc.jsx';
import LocalizationHOC from '../lib/localization-hoc.jsx';
import ProjectFetcherHOC from '../lib/project-fetcher-hoc.jsx';
import ProjectSaverHOC from '../lib/project-saver-hoc.jsx';
import storage from '../lib/storage';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';
import vmManagerHOC from '../lib/vm-manager-hoc.jsx';

import GUIComponent from '../components/gui/gui.jsx';

const messages = defineMessages({
    defaultProjectTitle: {
        id: 'gui.gui.defaultProjectTitle',
        description: 'Default title for project',
        defaultMessage: 'Scratch Project'
    }
});

class GUI extends React.Component {
    componentDidMount () {
        this.setReduxTitle(this.props.projectTitle);
        this.props.onStorageInit(storage);
    }
    componentDidUpdate (prevProps) {
        if (this.props.projectId !== prevProps.projectId && this.props.projectId !== null) {
            this.props.onUpdateProjectId(this.props.projectId);
        }
        if (this.props.projectTitle !== prevProps.projectTitle) {
            this.setReduxTitle(this.props.projectTitle);
        }
    }
    setReduxTitle (newTitle) {
        if (newTitle === null || typeof newTitle === 'undefined') {
            this.props.onUpdateReduxProjectTitle(
                this.props.intl.formatMessage(messages.defaultProjectTitle)
            );
        } else {
            this.props.onUpdateReduxProjectTitle(newTitle);
        }
    }
    render () {
        if (this.props.isError) {
            throw new Error(
                `Error in Scratch GUI [location=${window.location}]: ${this.props.error}`);
        }
        const {
            /* eslint-disable no-unused-vars */
            assetHost,
            cloudHost,
            error,
            hideIntro,
            isError,
            isShowingProject,
            onStorageInit,
            onUpdateProjectId,
            onUpdateReduxProjectTitle,
            projectHost,
            projectId,
            projectTitle,
            /* eslint-enable no-unused-vars */
            children,
            fetchingProject,
            isLoading,
            loadingStateVisible,
            ...componentProps
        } = this.props;
        return (
            <GUIComponent
                loading={fetchingProject || isLoading || loadingStateVisible}
                {...componentProps}
            >
                {children}
            </GUIComponent>
        );
    }
}

GUI.propTypes = {
    assetHost: PropTypes.string,
    children: PropTypes.node,
    cloudHost: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    fetchingProject: PropTypes.bool,
    hideIntro: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    intl: intlShape,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    loadingStateVisible: PropTypes.bool,
    onSeeCommunity: PropTypes.func,
    onStorageInit: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    onUpdateReduxProjectTitle: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    projectHost: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    projectTitle: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired
};

GUI.defaultProps = {
    onStorageInit: storageInstance => storageInstance.addOfficialScratchWebStores(),
    onUpdateProjectId: () => {}
};

const mapStateToProps = (state, ownProps) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    return {
        activeTabIndex: state.scratchGui.editorTab.activeTabIndex,
        alertsVisible: state.scratchGui.alerts.visible,
        backdropLibraryVisible: state.scratchGui.modals.backdropLibrary,
        blocksTabVisible: state.scratchGui.editorTab.activeTabIndex === BLOCKS_TAB_INDEX,
        cardsVisible: state.scratchGui.cards.visible,
        connectionModalVisible: state.scratchGui.modals.connectionModal,
        costumeLibraryVisible: state.scratchGui.modals.costumeLibrary,
        costumesTabVisible: state.scratchGui.editorTab.activeTabIndex === COSTUMES_TAB_INDEX,
        error: state.scratchGui.projectState.error,
        importInfoVisible: state.scratchGui.modals.importInfo,
        isError: getIsError(loadingState),
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        isRtl: state.locales.isRtl,
        isShowingProject: getIsShowingProject(loadingState),
        loadingStateVisible: state.scratchGui.modals.loadingProject,
        previewInfoVisible: state.scratchGui.modals.previewInfo && !ownProps.hideIntro,
        projectId: state.scratchGui.projectState.projectId,
        targetIsStage: (
            state.scratchGui.targets.stage &&
            state.scratchGui.targets.stage.id === state.scratchGui.targets.editingTarget
        ),
        soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
        tipsLibraryVisible: state.scratchGui.modals.tipsLibrary,
        vm: state.scratchGui.vm
    };
};

const mapDispatchToProps = dispatch => ({
    onExtensionButtonClick: () => dispatch(openExtensionLibrary()),
    onActivateTab: tab => dispatch(activateTab(tab)),
    onActivateCostumesTab: () => dispatch(activateTab(COSTUMES_TAB_INDEX)),
    onActivateSoundsTab: () => dispatch(activateTab(SOUNDS_TAB_INDEX)),
    onRequestCloseBackdropLibrary: () => dispatch(closeBackdropLibrary()),
    onRequestCloseCostumeLibrary: () => dispatch(closeCostumeLibrary()),
    onUpdateReduxProjectTitle: title => dispatch(setProjectTitle(title))
});

const ConnectedGUI = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps,
)(GUI));

// note that redux's 'compose' function is just being used as a general utility to make
// the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
// ability to compose reducers.
const WrappedGui = compose(
    LocalizationHOC,
    ErrorBoundaryHOC('Top Level App'),
    FontLoaderHOC,
    ProjectFetcherHOC,
    ProjectSaverHOC,
    vmListenerHOC,
    vmManagerHOC
)(ConnectedGUI);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;
