import analytics from '../lib/analytics';

import decks from '../lib/libraries/decks/index.jsx';

const CLOSE_CARDS = 'scratch-gui/cards/CLOSE_CARDS';
const SHRINK_EXPAND_CARDS = 'scratch-gui/cards/SHRINK_EXPAND_CARDS';
const VIEW_CARDS = 'scratch-gui/cards/VIEW_CARDS';
const ACTIVATE_DECK = 'scratch-gui/cards/ACTIVATE_DECK';
const NEXT_STEP = 'scratch-gui/cards/NEXT_STEP';
const PREV_STEP = 'scratch-gui/cards/PREV_STEP';
const DRAG_CARD = 'scratch-gui/cards/DRAG_CARD';
const START_DRAG = 'scratch-gui/cards/START_DRAG';
const END_DRAG = 'scratch-gui/cards/END_DRAG';

const initialState = {
    visible: false,
    content: decks,
    activeDeckId: null,
    step: 0,
    x: 0,
    y: 0,
    expanded: true,
    dragging: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CLOSE_CARDS:
        return Object.assign({}, state, {
            visible: false
        });
    case SHRINK_EXPAND_CARDS:
        return Object.assign({}, state, {
            expanded: !state.expanded
        });
    case VIEW_CARDS:
        return Object.assign({}, state, {
            visible: true
        });
    case ACTIVATE_DECK:
        return Object.assign({}, state, {
            activeDeckId: action.activeDeckId,
            step: 0,
            x: 0,
            y: 0,
            expanded: true,
            visible: true
        });
    case NEXT_STEP:
        if (state.activeDeckId !== null) {
            analytics.event({
                category: 'how-to',
                action: 'next step',
                label: `${state.activeDeckId} - ${state.step}`
            });
            return Object.assign({}, state, {
                step: state.step + 1
            });
        }
        return state;
    case PREV_STEP:
        if (state.activeDeckId !== null) {
            if (state.step > 0) {
                return Object.assign({}, state, {
                    step: state.step - 1
                });
            }
        }
        return state;
    case DRAG_CARD:
        return Object.assign({}, state, {
            x: action.x,
            y: action.y
        });
    case START_DRAG:
        return Object.assign({}, state, {
            dragging: true
        });
    case END_DRAG:
        return Object.assign({}, state, {
            dragging: false
        });
    default:
        return state;
    }
};

const activateDeck = function (activeDeckId) {
    return {
        type: ACTIVATE_DECK,
        activeDeckId
    };
};

const viewCards = function () {
    return {type: VIEW_CARDS};
};

const closeCards = function () {
    return {type: CLOSE_CARDS};
};

const shrinkExpandCards = function () {
    return {type: SHRINK_EXPAND_CARDS};
};

const nextStep = function () {
    return {type: NEXT_STEP};
};

const prevStep = function () {
    return {type: PREV_STEP};
};

const dragCard = function (x, y) {
    return {type: DRAG_CARD, x, y};
};

const startDrag = function () {
    return {type: START_DRAG};
};

const endDrag = function () {
    return {type: END_DRAG};
};

export {
    reducer as default,
    initialState as cardsInitialState,
    activateDeck,
    viewCards,
    closeCards,
    shrinkExpandCards,
    nextStep,
    prevStep,
    dragCard,
    startDrag,
    endDrag
};
