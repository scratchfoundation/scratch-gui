import {connect} from 'react-redux';

import {
    activateDeck,
    viewCards,
    closeCards,
    nextStep,
    prevStep,
    toggleLightbox,
    dragCard
} from '../reducers/cards';

import {
    openTipsLibrary
} from '../reducers/modals';

import CardsComponent from '../components/cards/cards.jsx';

const mapStateToProps = state => ({
    visible: state.cards.visible,
    content: state.cards.content,
    activeDeckIndex: state.cards.activeDeckIndex,
    step: state.cards.step,
    lightboxVisible: state.cards.lightboxVisible,
    x: state.cards.x,
    y: state.cards.y
});

const mapDispatchToProps = dispatch => ({
    onActivateDeckFactory: i => () => dispatch(activateDeck(i)),
    onExitDeck: () => {
        dispatch(openTipsLibrary());
        dispatch(closeCards());
    },
    onCloseCards: () => dispatch(closeCards()),
    onNextStep: () => dispatch(nextStep()),
    onPrevStep: () => dispatch(prevStep()),
    onToggleLightbox: () => dispatch(toggleLightbox()),
    onDrag: (e_, data) => dispatch(dragCard(data.x, data.y))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardsComponent);
