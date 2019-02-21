import PropTypes from 'prop-types';
import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import VM from 'scratch-vm';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
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
    closeBackdropLibrary,
    closeTelemetryModal,
    openExtensionLibrary
} from '../reducers/modals';

import FontLoaderHOC from '../lib/font-loader-hoc.jsx';
import LocalizationHOC from '../lib/localization-hoc.jsx';
import ProjectFetcherHOC from '../lib/project-fetcher-hoc.jsx';
import ProjectSaverHOC from '../lib/project-saver-hoc.jsx';
import QueryParserHOC from '../lib/query-parser-hoc.jsx';
import storage from '../lib/storage';
import vmListenerHOC from '../lib/vm-listener-hoc.jsx';
import vmManagerHOC from '../lib/vm-manager-hoc.jsx';
import cloudManagerHOC from '../lib/cloud-manager-hoc.jsx';
import delayHOC from '../lib/delay-hoc.jsx';

import {setIsScratchDesktop} from '../lib/isScratchDesktop.js';

import Box from '../components/box/box.jsx';
import BootstrapLoader from '../components/bootstrap-loader/bootstrap-loader.jsx';

const messages = defineMessages({
    defaultProjectTitle: {
        id: 'gui.gui.defaultProjectTitle',
        description: 'Default title for project',
        defaultMessage: 'Scratch Project'
    }
});

const PreevaluateGUI = delayHOC({
    ready: true,
    stall: true,
    weight: 1
})(delayHOC.loadChildren);

const GUIPlaceholder = ({isRtl}) => (
    <BootstrapLoader dir={isRtl ? 'rtl' : 'ltr'}>
        {/* If we are waiting we can evaluate pieces before rendering the gui.
            So we can evaluate pain and the gui component in separate steps. If
            before any of the steps what we are waiting on finishes, these
            pre-evaluations will be removed from delay's queue and instead their
            modules will be evaluated as part of the normal application path.
            So if we wait long enough we'll evaluate early and take less time
            to render the gui component, or we don't wait long enough and
            evaluate anyways on demand. This way we are doing some amount of
            work while the application is idle, waiting on the network, during
            the loading process. */}
        <PreevaluateGUI>{() => require('scratch-paint')}</PreevaluateGUI>
        <PreevaluateGUI>{() => require('../components/gui/gui.jsx')}</PreevaluateGUI>
    </BootstrapLoader>
);

const InnerGUIComponent = delayHOC({
    ready: true,
    stall: delayHOC.loading,
    // Its best that we render the gui component after we complete fetching but
    // not immediately when fetch is complete. A stall of weight 0 will perform
    // the gui component load when the next setTimeout callback executes. So if
    // we are still fetching, we'll wait our turn. After fetching we'll run
    // after the initial deserialization has occured.
    //
    // This way if we haven't rendered the gui component yet, we will after
    // deserializing and be able to render the Loader component.
    weight: state => delayHOC.fetching(state) ? 10 : 0,
    placeholder: GUIPlaceholder
})(delayHOC.loadComponent(() => require('../components/gui/gui.jsx')));

// This will live somewhere else in a proper PR. This is placed here to
// illustrate its separate nature from Stage.
//
// Scratch needs 4 things to load a project, a vm, a storage, an audio engine,
// and a renderer (with related svg and bitmap adapters). If we can create those
// without rendering more GUI we can load the project earlier and then render
// parts of the gui while project loading is idle or all at once when the
// project is ready.
const buildRenderer = vm => {
    if (vm.renderer) {
        return;
    }

    const Renderer = require('scratch-render');

    const canvas = document.createElement('canvas');
    const isRendererSupported = Renderer.isSupported(canvas);
    if (isRendererSupported) {
        // Sharing the canvas that is used to check if renderer is supported
        // lets us reuse the WebGL context produced in isSupported. That reuse
        // can save a good bit of time.
        const renderer = new Renderer(canvas);
        vm.attachRenderer(renderer);

        const {SVGRenderer: V2SVGAdapter} = require('scratch-svg-renderer');
        const {BitmapAdapter: V2BitmapAdapter} = require('scratch-svg-renderer');

        vm.attachV2SVGAdapter(new V2SVGAdapter());
        vm.attachV2BitmapAdapter(new V2BitmapAdapter());
    }
};

const RendererPlaceholder = ({isRtl, vm}) => (
    <BootstrapLoader dir={isRtl ? 'rtl' : 'ltr'}>
        <PreevaluateGUI>{() => require('scratch-svg-renderer')}</PreevaluateGUI>
        <PreevaluateGUI>{() => require('scratch-render')}</PreevaluateGUI>
        <PreevaluateGUI>{() => buildRenderer(vm)}</PreevaluateGUI>
    </BootstrapLoader>
);

const GUIComponent = delayHOC({
    ready: true,
    stall: delayHOC.fetching,
    weight: 5,
    placeholder: RendererPlaceholder
})(({children, ...props}) => {
    buildRenderer(props.vm);
    return <InnerGUIComponent {...props}>{children}</InnerGUIComponent>;
});

class GUI extends React.Component {
    componentDidMount () {
        setIsScratchDesktop(this.props.isScratchDesktop);
        this.setReduxTitle(this.props.projectTitle);
    }
    componentDidUpdate (prevProps) {
        if (this.props.projectId !== prevProps.projectId && this.props.projectId !== null) {
            this.props.onUpdateProjectId(this.props.projectId);
        }
        if (this.props.projectTitle !== prevProps.projectTitle) {
            this.setReduxTitle(this.props.projectTitle);
        }
        if (this.props.isShowingProject && !prevProps.isShowingProject) {
            // this only notifies container when a project changes from not yet loaded to loaded
            // At this time the project view in www doesn't need to know when a project is unloaded
            this.props.onProjectLoaded();
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
            isError,
            isScratchDesktop,
            isShowingProject,
            onProjectLoaded,
            onStorageInit,
            onUpdateProjectId,
            onUpdateReduxProjectTitle,
            projectHost,
            projectId,
            projectTitle,
            /* eslint-enable no-unused-vars */
            children,
            fetchingProject,
            isBootstrapping,
            loadingStateVisible,
            ...componentProps
        } = this.props;
        return (<GUIComponent
            {...componentProps}
        >
            {children}
        </GUIComponent>);
    }
}

GUI.propTypes = {
    assetHost: PropTypes.string,
    children: PropTypes.node,
    cloudHost: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    fetchingProject: PropTypes.bool,
    intl: intlShape,
    isError: PropTypes.bool,
    isScratchDesktop: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    loadingStateVisible: PropTypes.bool,
    onProjectLoaded: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onStorageInit: PropTypes.func,
    onUpdateProjectId: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    onUpdateReduxProjectTitle: PropTypes.func,
    projectHost: PropTypes.string,
    projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    projectTitle: PropTypes.string,
    telemetryModalVisible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};

GUI.defaultProps = {
    isScratchDesktop: false,
    onStorageInit: storageInstance => storageInstance.addOfficialScratchWebStores(),
    onProjectLoaded: () => {},
    onUpdateProjectId: () => {}
};

const mapStateToProps = state => {
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
        isError: getIsError(loadingState),
        isFullScreen: state.scratchGui.mode.isFullScreen,
        isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
        isRtl: state.locales.isRtl,
        isShowingProject: getIsShowingProject(loadingState),
        loadingStateVisible: state.scratchGui.modals.loadingProject,
        projectId: state.scratchGui.projectState.projectId,
        soundsTabVisible: state.scratchGui.editorTab.activeTabIndex === SOUNDS_TAB_INDEX,
        telemetryModalVisible: state.scratchGui.modals.telemetryModal,
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
    onRequestCloseTelemetryModal: () => dispatch(closeTelemetryModal()),
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
    ProjectSaverHOC,
    vmListenerHOC,
    vmManagerHOC,
    cloudManagerHOC
)(ConnectedGUI);

WrappedGui.setAppElement = ReactModal.setAppElement;
export default WrappedGui;
