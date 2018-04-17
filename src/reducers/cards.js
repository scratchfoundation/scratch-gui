import decks from '../lib/libraries/decks';

const CLOSE_CARDS = 'scratch-gui/cards/CLOSE_CARDS';
const VIEW_CARDS = 'scratch-gui/cards/VIEW_CARDS';
const ACTIVATE_DECK = 'scratch-gui/cards/ACTIVATE_DECK';
const NEXT_STEP = 'scratch-gui/cards/NEXT_STEP';
const PREV_STEP = 'scratch-gui/cards/PREV_STEP';
const TOGGLE_LIGHTBOX = 'scratch-gui/cards/TOGGLE_LIGHTBOX';
const DRAG_CARD = 'scratch-gui/cards/DRAG_CARD';
const START_DRAG = 'scratch-gui/cards/START_DRAG';
const END_DRAG = 'scratch-gui/cards/END_DRAG';

const initialState = {
    visible: true,
    content: decks,
    activeDeckIndex: null,
    step: 0,
    lightboxVisible: false,
    x: 292,
    y: 365,
    dragging: false
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case CLOSE_CARDS:
        return Object.assign({}, state, {
            visible: false
        });
    case VIEW_CARDS:
        return Object.assign({}, state, {
            visible: true
        });
    case ACTIVATE_DECK:
        return Object.assign({}, state, {
            activeDeckIndex: action.activeDeckIndex,
            step: 0,
            visible: true
        });
    case TOGGLE_LIGHTBOX:
        return Object.assign({}, state, {
            lightboxVisible: !state.lightboxVisible
        });
    case NEXT_STEP:
        if (state.activeDeckIndex !== null) {
            const steps = state.content[state.activeDeckIndex].steps.length;
            // if (state.step + 1 < steps - 1) {
                return Object.assign({}, state, {
                    step: state.step + 1
                });
            // }
        }
        return state;
    case PREV_STEP:
        if (state.activeDeckIndex !== null) {
            const steps = state.content[state.activeDeckIndex].steps.length;
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

const activateDeck = function (activeDeckIndex) {
    return {
        type: ACTIVATE_DECK,
        activeDeckIndex
    };
};

const viewCards = function () {
    return {type: VIEW_CARDS};
};

const closeCards = function () {
    return {type: CLOSE_CARDS};
};

const nextStep = function () {
    return {type: NEXT_STEP};
};

const prevStep = function () {
    return {type: PREV_STEP};
};

const toggleLightbox = function () {
    return {type: TOGGLE_LIGHTBOX};
};

const dragCard = function (x, y) {
    return {type: DRAG_CARD, x, y};
};

const startDrag = function () {
    return {type: START_DRAG};
};

const endDrag = function () {
    return {type: END_DRAG};
}

export {
    reducer as default,
    activateDeck,
    viewCards,
    closeCards,
    nextStep,
    prevStep,
    toggleLightbox,
    dragCard,
    startDrag,
    endDrag
};
