import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {injectIntl, defineMessages, intlShape} from 'react-intl';
import {setProjectUnchanged} from '../reducers/project-changed';
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
 * Like SB3Downloader but it uses the currently Chrome-only filesystem API
 */
class SB3DownloaderFileSystem extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'saveAsNew',
            'saveToLastFile',
            'saveToLastFileOrNew'
        ]);
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
        this.props.onProjectUnchanged();
        const content = await this.props.saveProjectSb3();
        await FileSystemAPI.writeToHandle(handle, content);
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
            {
                name: this.props.fileHandle ? this.props.fileHandle.name : null,
                saveAsNew: this.saveAsNew,
                saveToLastFile: this.saveToLastFile,
                saveToLastFileOrNew: this.saveToLastFileOrNew
            }
        );
    }
}

SB3DownloaderFileSystem.propTypes = {
    children: PropTypes.func,
    intl: intlShape,
    className: PropTypes.string,
    saveProjectSb3: PropTypes.func,
    onProjectUnchanged: PropTypes.func,
    fileHandle: PropTypes.shape({
        name: PropTypes.string
    }),
    onSetFileHandle: PropTypes.func
};
SB3DownloaderFileSystem.defaultProps = {
    className: ''
};

const mapStateToProps = state => ({
    saveProjectSb3: state.scratchGui.vm.saveProjectSb3.bind(state.scratchGui.vm),
    fileHandle: state.scratchGui.tw.fileHandle
});

const mapDispatchToProps = dispatch => ({
    onProjectUnchanged: () => dispatch(setProjectUnchanged()),
    onSetFileHandle: fileHandle => dispatch(setFileHandle(fileHandle))
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(SB3DownloaderFileSystem));
