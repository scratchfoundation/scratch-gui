import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

import Box from '../box/box.jsx';
import Button from '../button/button.jsx';

import styles from './alert.css';

class AlertComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnCloseAlert'
        ]);
    }
    handleOnCloseAlert () {
        this.props.onCloseAlert(this.props.index);
    }
    render () {
        return (
            <Box
                className={styles.alert}
            >
                <div className={styles.alertMessage}>
                    {this.props.iconURL ? (
                        <img
                            className={styles.alertIcon}
                            src={this.props.iconURL}
                        />
                    ) : null}
                    {this.props.message}
                </div>
                <Button
                    className={styles.alertRemoveButton}
                    onClick={this.handleOnCloseAlert}
                >
                    {'x'}
                </Button>
            </Box>
        );
    }
}

AlertComponent.propTypes = {
    iconURL: PropTypes.string,
    index: PropTypes.number,
    message: PropTypes.string,
    onCloseAlert: PropTypes.func.isRequired
};

export default AlertComponent;
