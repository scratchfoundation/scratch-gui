import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';

import InlineMessages from '../../containers/inline-messages.jsx';

import {
    manualUpdateProject
} from '../../reducers/project-state';

import {
    filterInlineAlerts
} from '../../reducers/alerts';

import styles from './save-status.css';

// Wrapper for inline messages in the nav bar, which are all related to saving.
// Show any inline messages if present, else show the "Save Now" button if the
// project has changed.
// We decided to not use an inline message for "Save Now" because it is a reflection
// of the project state, rather than an event.
const SaveStatus = ({
    alertsList,
    projectChanged,
    onClickSave
}) => (
    filterInlineAlerts(alertsList).length > 0 ? (
        <InlineMessages />
    ) : projectChanged && (
        <div
            className={styles.saveNow}
            onClick={onClickSave}
        >
            <FormattedMessage
                defaultMessage="Save Now"
                description="Title bar link for saving now"
                id="gui.menuBar.saveNowLink"
            />
        </div>
    ));

SaveStatus.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    onClickSave: PropTypes.func,
    projectChanged: PropTypes.bool
};

const mapStateToProps = state => ({
    alertsList: state.scratchGui.alerts.alertsList,
    projectChanged: state.scratchGui.projectChanged
});

const mapDispatchToProps = dispatch => ({
    onClickSave: () => dispatch(manualUpdateProject())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveStatus);
