import {connect} from 'react-redux';

import AlertsComponent from '../components/alerts/alerts.jsx';

const mapStateToProps = state => ({
    visible: state.scratchGui.alerts.visible,
    message: state.scratchGui.alerts.message
});

/* const mapDispatchToProps = dispatch => ({
    onActivateDeckFactory: id => () => dispatch(activateDeck(id)),
    onShowAll: () => {
        dispatch(openTipsLibrary());
        dispatch(closeCards());
    },
    onCloseCards: () => dispatch(closeCards()),
    onNextStep: () => dispatch(nextStep()),
    onPrevStep: () => dispatch(prevStep()),
    onDrag: (e_, data) => dispatch(dragCard(data.x, data.y)),
    onStartDrag: () => dispatch(startDrag()),
    onEndDrag: () => dispatch(endDrag())
}); */

export default connect(
    mapStateToProps
)(AlertsComponent);
