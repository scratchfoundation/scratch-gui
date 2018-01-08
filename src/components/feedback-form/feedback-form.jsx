import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';

import Box from '../box/box.jsx';

import {closeFeedbackForm} from '../../reducers/modals';

import styles from './feedback-form.css';

const FeedbackForm = props => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onFeedbackGiven}
    >
        <Box className={styles.body}>
            {/* eslint-disable react/no-unknown-property */}
            <iframe
                frameborder="0"
                height="450"
                marginheight="0"
                marginwidth="0"
                src="https://docs.google.com/forms/d/e/1FAIpQLSfAaCbOwcwQb4vrNDrlNw5BTRZc4xOayGRPzymaQ22heBTLmQ/viewform?embedded=true"
                width="500"
            >
                Loading...
            </iframe>
            {/* eslint-enable react/no-unknown-property */}
        </Box>
    </ReactModal>
);

FeedbackForm.propTypes = {
    onFeedbackGiven: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onFeedbackGiven: () => {
        dispatch(closeFeedbackForm());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedbackForm);
