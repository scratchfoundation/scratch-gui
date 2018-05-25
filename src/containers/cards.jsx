import {connect} from 'react-redux';

import {
    activateDeck,
    closeCards,
    nextStep,
    prevStep,
    dragCard,
    startDrag,
    endDrag
} from '../reducers/cards';

import {
    openTipsLibrary
} from '../reducers/modals';

import CardsComponent from '../components/cards/cards.jsx';

const mapStateToProps = state => ({
    visible: state.scratchGui.cards.visible,
    content: state.scratchGui.cards.content,
    activeDeckId: state.scratchGui.cards.activeDeckId,
    step: state.scratchGui.cards.step,
    x: state.scratchGui.cards.x,
    y: state.scratchGui.cards.y,
    dragging: state.scratchGui.cards.dragging
});

const mapDispatchToProps = dispatch => ({
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardsComponent);
