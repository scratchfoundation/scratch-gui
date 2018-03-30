import {connect} from 'react-redux';

import {
    activateDeck,
    viewCards,
    closeCards,
    nextStep,
    prevStep
} from '../reducers/cards';

import CardsComponent from '../components/cards/cards.jsx';

const mapStateToProps = state => ({
    visible: state.cards.visible,
    content: state.cards.content,
    activeDeckIndex: state.cards.activeDeckIndex,
    step: state.cards.step
});

const mapDispatchToProps = dispatch => ({
    onActivateDeckFactory: i => () => dispatch(activateDeck(i)),
    onExitDeck: () => dispatch(activateDeck(null)),
    onCloseCards: () => dispatch(closeCards()),
    onNextStep: () => dispatch(nextStep()),
    onPrevStep: () => dispatch(prevStep())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardsComponent);
