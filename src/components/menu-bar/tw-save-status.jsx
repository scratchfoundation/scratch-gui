import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import SB3Downloader from '../../containers/sb3-downloader.jsx';

import styles from './save-status.css';

const TWSaveStatus = ({
    projectChanged
}) => (
    projectChanged ? (
        <SB3Downloader>{(className, downloadProjectCallback) => (
            <div
                onClick={downloadProjectCallback}
                className={styles.saveNow}
            >
                <FormattedMessage
                    defaultMessage="UNSAVED CHANGES"
                    description="Title bar link for unsaved changes"
                    id="tw.unsavedChanges"
                />
            </div>
        )}</SB3Downloader>
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
