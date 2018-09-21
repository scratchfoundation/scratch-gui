import {connect} from 'react-redux';

import {
    showAlert,
    closeAlert
} from '../reducers/alerts';

import AlertsComponent from '../components/alerts/alerts.jsx';

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
)(AlertsComponent);
