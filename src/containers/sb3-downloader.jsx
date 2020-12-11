import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl, defineMessages, intlShape} from 'react-intl';
import {projectTitleInitialState} from '../reducers/project-title';
import downloadBlob from '../lib/download-blob';
import {setProjectUnchanged} from '../reducers/project-changed';
import {showAlertWithTimeout} from '../reducers/alerts';
import {setFileHandle} from '../reducers/tw';
import FileSystemAPI from '../lib/tw-filesystem-api';

const messages = defineMessages({
    error: {
        defaultMessage: `Could not save file. ({error})`,
        description: 'Error displayed when a file could not be saved',
        id: 'tw.fs.saveError'
    }
});

/**
 * Project saver component passes a downloadProject function to its child.
 * It expects this child to be a function with the signature
 *     function (downloadProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <SB3Downloader>{(downloadProject, props) => (
 *     <MyCoolComponent
 *         onClick={downloadProject}
 *         {...props}
 *     />
 * )}</SB3Downloader>
 */
class SB3Downloader extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'downloadProject',
            'saveAsNew',
            'saveToLastFile',
            'saveToLastFileOrNew'
        ]);
    }
    downloadProject () {
        this.props.onProjectUnchanged();
        this.props.saveProjectSb3().then(content => {
            if (this.props.onSaveFinished) {
                this.props.onSaveFinished();
            }
            downloadBlob(this.props.projectFilename, content);
        });
    }
    async saveAsNew () {
        try {
            const handle = await FileSystemAPI.showSaveFilePicker();
            this.props.onSetFileHandle(handle);
            await this.saveToHandle(handle);
        } catch (e) {
            this.handleSaveError(e);
        }
    }
    async saveToLastFile () {
        try {
            await this.saveToHandle(this.props.fileHandle);
        } catch (e) {
            this.handleSaveError(e);
        }
    }
    async saveToLastFileOrNew () {
        if (this.props.fileHandle) {
            return this.saveToLastFile();
        }
        return this.saveAsNew();
    }
    async saveToHandle (handle) {
        const content = await this.props.saveProjectSb3();
        await FileSystemAPI.writeToHandle(handle, content);
        this.props.onProjectUnchanged();
    }
    handleSaveError (e) {
        if (e.name === 'AbortError') {
            return;
        }
        // eslint-disable-next-line no-console
        console.error(e);
        // eslint-disable-next-line no-alert
        alert(this.props.intl.formatMessage(messages.error, {
            error: `${e}`
        }));
    }
    render () {
        const {
            children
        } = this.props;
        return children(
            this.props.className,
            this.downloadProject,
            // tw: extended API when FileSystem API is available
            FileSystemAPI.available() ? {
                name: this.props.fileHandle ? this.props.fileHandle.name : null,
                saveAsNew: this.saveAsNew,
                saveToLastFile: this.saveToLastFile,
                saveToLastFileOrNew: this.saveToLastFileOrNew
            } : null
        );
    }
}

const getProjectFilename = (curTitle, defaultTitle) => {
    let filenameTitle = curTitle;
    if (!filenameTitle || filenameTitle.length === 0) {
        filenameTitle = defaultTitle;
    }
    return `${filenameTitle.substring(0, 100)}.sb3`;
};

SB3Downloader.propTypes = {
    children: PropTypes.func,
    intl: intlShape,
    className: PropTypes.string,
    fileHandle: PropTypes.shape({
        name: PropTypes.string
    }),
    onSaveFinished: PropTypes.func,
    projectFilename: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    onSetFileHandle: PropTypes.func,
    onShowSavingAlert: PropTypes.func,
    onShowSaveSuccessAlert: PropTypes.func,
    onProjectUnchanged: PropTypes.func
};
SB3Downloader.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    fileHandle: state.scratchGui.tw.fileHandle,
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    projectFilename: getProjectFilename(state.scratchGui.projectTitle, projectTitleInitialState)
});

const mapDispatchToProps = dispatch => ({
    onSetFileHandle: fileHandle => dispatch(setFileHandle(fileHandle)),
    onShowSavingAlert: () => showAlertWithTimeout(dispatch, 'saving'),
    onShowSaveSuccessAlert: () => showAlertWithTimeout(dispatch, 'saveSuccess'),
    onProjectUnchanged: () => dispatch(setProjectUnchanged())
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SB3Downloader));
