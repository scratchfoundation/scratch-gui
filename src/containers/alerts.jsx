import {connect} from 'react-redux';

import {
    showAlert
} from '../reducers/alerts';

import AlertsComponent from '../components/alerts/alerts.jsx';

const mapStateToProps = state => ({
    visible: state.scratchGui.alerts.visible,
    message: state.scratchGui.alerts.message
});

const mapDispatchToProps = dispatch => ({
    onShowAlert: () => dispatch(showAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertsComponent);
