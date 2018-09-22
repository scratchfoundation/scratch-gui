import React from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    showAlert,
    closeAlert
} from '../reducers/alerts';

import AlertsComponent from '../components/alerts/alerts.jsx';

class Alerts extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOnCloseAlert'
        ]);
    }
    handleOnCloseAlert (e) {
        this.props.onCloseAlert(e.target.key);
    }
    render () {
        return (
            <AlertsComponent
                alertsList={this.props.alertsList}
                className={this.props.className}
                onCloseAlert={this.handleOnCloseAlert}
            />
        );
    }
}

Alerts.propTypes = {
    alertsList: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onCloseAlert: PropTypes.func
};

const mapStateToProps = state => ({
    visible: state.scratchGui.alerts.visible,
    alertsList: state.scratchGui.alerts.alertsList
});

const mapDispatchToProps = dispatch => ({
    onShowAlert: () => dispatch(showAlert()),
    onCloseAlert: index => dispatch(closeAlert(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);
