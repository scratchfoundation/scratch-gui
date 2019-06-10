import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import log from '../lib/log';
import sharedMessages from '../lib/shared-messages';

import {
    LoadingStates,
    getIsLoadingUpload,
    getIsShowingWithoutId,
    onLoadedProject,
    requestProjectUpload
} from '../reducers/project-state';

import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';
import {
    closeFileMenu
} from '../reducers/menus';

/**
 * SBFileUploader component passes a file input, load handler and props to its child.
 * It expects this child to be a function with the signature
 *     function (renderFileInput, loadProject) {}
 * The component can then be used to attach project loading functionality
 * to any other component:
 *
 * <SBFileUploader>{(renderFileInput, loadProject) => (
 *     <MyCoolComponent
 *         onClick={loadProject}
 *     >
 *         {renderFileInput()}
 *     </MyCoolComponent>
 * )}</SBFileUploader>
 */

const messages = defineMessages({
    loadError: {
        id: 'gui.projectLoader.loadError',
        defaultMessage: 'The project file that was selected failed to load.',
        description: 'An error that displays when a local project file fails to load.'
    }
});

class SBFileUploader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getProjectTitleFromFilename',
            'renderFileInput',
            'setFileInput',
            'handleChange',
            'handleClick',
            'onload',
            'resetFileInput'
        ]);
    }
    componentWillMount () {
        this.reader = new FileReader();
        this.reader.onload = this.onload;
        this.resetFileInput();
    }
    componentDidUpdate (prevProps) {
        if (this.props.isLoadingUpload && !prevProps.isLoadingUpload && this.fileToUpload && this.reader) {
            this.reader.readAsArrayBuffer(this.fileToUpload);
        }
    }
    componentWillUnmount () {
        this.reader = null;
        this.resetFileInput();
    }
    resetFileInput () {
        this.fileToUpload = null;
        if (this.fileInput) {
            this.fileInput.value = null;
        }
    }
    getProjectTitleFromFilename (fileInputFilename) {
        if (!fileInputFilename) return '';
        // only parse title with valid scratch project extensions
        // (.sb, .sb2, and .sb3)
        const matches = fileInputFilename.match(/^(.*)\.sb[23]?$/);
        if (!matches) return '';
        return matches[1].substring(0, 100); // truncate project title to max 100 chars
    }
    // called when user has finished selecting a file to upload
    handleChange (e) {
        const {
            intl,
            isShowingWithoutId,
            loadingState,
            projectChanged,
            userOwnsProject
        } = this.props;

        const thisFileInput = e.target;
        if (thisFileInput.files) { // Don't attempt to load if no file was selected
            this.fileToUpload = thisFileInput.files[0];

            // If user owns the project, or user has changed the project,
            // we must confirm with the user that they really intend to replace it.
            // (If they don't own the project and haven't changed it, no need to confirm.)
            let uploadAllowed = true;
            if (userOwnsProject || (projectChanged && isShowingWithoutId)) {
                uploadAllowed = confirm( // eslint-disable-line no-alert
                    intl.formatMessage(sharedMessages.replaceProjectWarning)
                );
            }
            if (uploadAllowed) {
                this.props.requestProjectUpload(loadingState);
            } else {
                this.props.closeFileMenu();
            }
        }
    }
    // called when file upload raw data is available in the reader
    onload () {
        if (this.reader) {
            this.props.onLoadingStarted();
            const filename = this.fileToUpload && this.fileToUpload.name;
            this.props.vm.loadProject(this.reader.result)
                .then(() => {
                    this.props.onLoadingFinished(this.props.loadingState, true);
                    // Reset the file input after project is loaded
                    // This is necessary in case the user wants to reload a project
                    if (filename) {
                        const uploadedProjectTitle = this.getProjectTitleFromFilename(filename);
                        this.props.onUpdateProjectTitle(uploadedProjectTitle);
                    }
                    this.resetFileInput();
                })
                .catch(error => {
                    log.warn(error);
                    alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                    this.props.onLoadingFinished(this.props.loadingState, false);
                    // Reset the file input after project is loaded
                    // This is necessary in case the user wants to reload a project
                    this.resetFileInput();
                });
        }
    }
    handleClick () {
        // open filesystem browsing window
        this.fileInput.click();
    }
    setFileInput (input) {
        this.fileInput = input;
    }
    renderFileInput () {
        return (
            <input
                accept=".sb,.sb2,.sb3"
                ref={this.setFileInput}
                style={{display: 'none'}}
                type="file"
                onChange={this.handleChange}
            />
        );
    }
    render () {
        return this.props.children(this.props.className, this.renderFileInput, this.handleClick);
    }
}

SBFileUploader.propTypes = {
    canSave: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.func,
    className: PropTypes.string,
    closeFileMenu: PropTypes.func,
    intl: intlShape.isRequired,
    isLoadingUpload: PropTypes.bool,
    isShowingWithoutId: PropTypes.bool,
    loadingState: PropTypes.oneOf(LoadingStates),
    onLoadingFinished: PropTypes.func,
    onLoadingStarted: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    projectChanged: PropTypes.bool,
    requestProjectUpload: PropTypes.func,
    userOwnsProject: PropTypes.bool,
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};
SBFileUploader.defaultProps = {
    className: ''
};
const mapStateToProps = state => {
    const loadingState = state.scratchGui.projectState.loadingState;
    return {
        isLoadingUpload: getIsLoadingUpload(loadingState),
        isShowingWithoutId: getIsShowingWithoutId(loadingState),
        loadingState: loadingState,
        projectChanged: state.scratchGui.projectChanged,
        vm: state.scratchGui.vm
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeFileMenu: () => dispatch(closeFileMenu()),
    onLoadingFinished: (loadingState, success) => {
        dispatch(onLoadedProject(loadingState, ownProps.canSave, success));
        dispatch(closeLoadingProject());
        dispatch(closeFileMenu());
    },
    requestProjectUpload: loadingState => dispatch(requestProjectUpload(loadingState)),
    onLoadingStarted: () => dispatch(openLoadingProject())
});

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
    {}, stateProps, dispatchProps, ownProps
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(injectIntl(SBFileUploader));
