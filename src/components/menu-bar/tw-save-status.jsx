import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import SB3DownloaderFileSystem from '../../containers/tw-sb3-downloader-filesystem.jsx';
import FileSystemAPI from '../../lib/tw-filesystem-api';

import styles from './save-status.css';

const TWSaveStatus = ({
    projectChanged
}) => (
    projectChanged ? (
        FileSystemAPI.available() ? (
            <SB3DownloaderFileSystem>{(_className, {saveToLastFileOrNew}) => (
                <div
                    onClick={saveToLastFileOrNew}
                    className={styles.saveNow}
                >
                    <FormattedMessage
                        defaultMessage="Unsaved Changes"
                        description="Title bar link indicating unsaved changes"
                        id="tw.unsavedChanges"
                    />
                </div>
            )}</SB3DownloaderFileSystem>
        ) : (
            <SB3Downloader>{(_className, downloadProjectCallback) => (
                <div
                    onClick={downloadProjectCallback}
                    className={styles.saveNow}
                >
                    <FormattedMessage
                        defaultMessage="Unsaved Changes"
                        description="Title bar link indicating unsaved changes"
                        id="tw.unsavedChanges"
                    />
                </div>
            )}</SB3Downloader>
        )
    ) : null
);

TWSaveStatus.propTypes = {
    projectChanged: PropTypes.bool
};

const mapStateToProps = state => ({
    projectChanged: state.scratchGui.projectChanged
});

export default connect(
    mapStateToProps,
    () => ({})
)(TWSaveStatus);
