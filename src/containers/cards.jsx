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
    visible: state.cards.visible,
    content: state.cards.content,
    activeDeckId: state.cards.activeDeckId,
    step: state.cards.step,
    x: state.cards.x,
    y: state.cards.y,
    dragging: state.cards.dragging
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
