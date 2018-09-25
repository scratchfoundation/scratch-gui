import {connect} from 'react-redux';

import {
    showAlert,
    closeAlert
} from '../reducers/alerts';

import AlertsComponent from '../components/alerts/alerts.jsx';

const mapStateToProps = state => ({
    visible: state.scratchGui.alerts.visible,
    message: state.scratchGui.alerts.message
});

const mapDispatchToProps = dispatch => ({
    onShowAlert: () => dispatch(showAlert()),
    onCloseAlert: () => dispatch(closeAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertsComponent);
