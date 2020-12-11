import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import InlineMessages from '../../containers/inline-messages.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import {filterInlineAlerts} from '../../reducers/alerts';

import styles from './save-status.css';

const TWSaveStatus = ({
    alertsList,
    projectChanged
}) => (
    filterInlineAlerts(alertsList).length > 0 ? (
        <InlineMessages />
    ) : projectChanged && (
        <SB3Downloader>{(_className, _downloadProjectCallback, {smartSave}) => (
            <div
                onClick={smartSave}
                className={styles.saveNow}
            >
                <FormattedMessage
                    defaultMessage="Unsaved Changes"
                    description="Title bar link indicating unsaved changes"
                    id="tw.unsavedChanges"
                />
            </div>
        )}</SB3Downloader>
    ));

TWSaveStatus.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    projectChanged: PropTypes.bool
};

const mapStateToProps = state => ({
    alertsList: state.scratchGui.alerts.alertsList,
    projectChanged: state.scratchGui.projectChanged
});

export default connect(
    mapStateToProps,
    () => ({})
)(TWSaveStatus);
