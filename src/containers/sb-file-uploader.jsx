import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import analytics from '../lib/analytics';
import log from '../lib/log';
import {setProjectTitle} from '../reducers/project-title';
import {LoadingStates, onLoadedProject, onProjectUploadStarted} from '../reducers/project-state';

import {
    openLoadingProject,
    closeLoadingProject
} from '../reducers/modals';

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
            'renderFileInput',
            'setFileInput',
            'handleChange',
            'handleClick'
        ]);
    }
    // called when user has finished selecting a file to upload
    handleChange (e) {
        // Remove the hash if any (without triggering a hash change event or a reload)
        history.replaceState({}, document.title, '.');
        const reader = new FileReader();
        const thisFileInput = e.target;
        reader.onload = () => this.props.vm.loadProject(reader.result)
            .then(() => {
                analytics.event({
                    category: 'project',
                    action: 'Import Project File',
                    nonInteraction: true
                });
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
            })
            .catch(error => {
                log.warn(error);
                alert(this.props.intl.formatMessage(messages.loadError)); // eslint-disable-line no-alert
                this.props.onLoadingFinished(this.props.loadingState);
                // Reset the file input after project is loaded
                // This is necessary in case the user wants to reload a project
                thisFileInput.value = null;
            });
        if (thisFileInput.files) { // Don't attempt to load if no file was selected
            this.props.onLoadingStarted();
            reader.readAsArrayBuffer(thisFileInput.files[0]);
            // extract the title from the file and set it as current project title
            if (thisFileInput.files[0].name) {
                const matches = thisFileInput.files[0].name.match(/^(.*?)(\.sb[23]?)?$/);
                if (matches) {
                    const truncatedProjectTitle = matches[1].substring(0, 100);
                    this.props.onSetReduxProjectTitle(truncatedProjectTitle);
                    if (this.props.onUpdateProjectTitle) {
                        this.props.onUpdateProjectTitle(truncatedProjectTitle);
                    }
                }
            }
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
                accept=".sb2,.sb3"
                ref={this.setFileInput}
                style={{display: 'none'}}
                type="file"
                onChange={this.handleChange}
            />
        );
    }
    render () {
        return this.props.children(this.renderFileInput, this.handleClick);
    }
}

SBFileUploader.propTypes = {
    children: PropTypes.func,
    intl: intlShape.isRequired,
    loadingState: PropTypes.oneOf(LoadingStates),
    onLoadingFinished: PropTypes.func,
    onLoadingStarted: PropTypes.func,
    onSetReduxProjectTitle: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    vm: PropTypes.shape({
        loadProject: PropTypes.func
    })
};
const mapStateToProps = state => ({
    loadingState: state.scratchGui.projectState.loadingState,
    vm: state.scratchGui.vm
});

const mapDispatchToProps = dispatch => ({
    onLoadingFinished: loadingState => {
        dispatch(onLoadedProject(loadingState));
        dispatch(closeLoadingProject());
    },
    onSetReduxProjectTitle: title => dispatch(setProjectTitle(title)),
    onLoadingStarted: () => {
        dispatch(openLoadingProject());
        dispatch(onProjectUploadStarted());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(SBFileUploader));
