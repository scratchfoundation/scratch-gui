import {connect} from 'react-redux';

import {
    activateDeck,
    viewCards,
    closeCards,
    nextStep,
    prevStep,
    toggleLightbox
} from '../reducers/cards';

import CardsComponent from '../components/cards/cards.jsx';

const mapStateToProps = state => ({
    visible: state.cards.visible,
    content: state.cards.content,
    activeDeckIndex: state.cards.activeDeckIndex,
    step: state.cards.step,
    lightboxVisible: state.cards.lightboxVisible
});

const mapDispatchToProps = dispatch => ({
    onActivateDeckFactory: i => () => dispatch(activateDeck(i)),
    onExitDeck: () => dispatch(activateDeck(null)),
    onCloseCards: () => dispatch(closeCards()),
    onNextStep: () => dispatch(nextStep()),
    onPrevStep: () => dispatch(prevStep()),
    onToggleLightbox: () => dispatch(toggleLightbox())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardsComponent);
