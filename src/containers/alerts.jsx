import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    closeAlert
} from '../reducers/alerts';

import Box from '../components/box/box.jsx';
import Alert from '../containers/alert.jsx';

const Alerts = ({
    alertsList,
    className,
    onCloseAlert
}) => (
    <Box
        bounds="parent"
        className={classNames(className)}
    >
        {alertsList.map((a, index) => (
            <Alert
                iconURL={a.iconURL}
                index={index}
                key={index}
                message={a.message}
                onCloseAlert={onCloseAlert}
            />
        ))}
    </Box>
);

Alerts.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func
};

const mapStateToProps = state => ({
    alertsList: state.scratchGui.alerts.alertsList
});

const mapDispatchToProps = dispatch => ({
    onCloseAlert: index => dispatch(closeAlert(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);
