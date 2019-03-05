/* eslint-env jest */
import modeReducer from '../../../src/reducers/mode';

const SET_FULL_SCREEN = 'scratch-gui/mode/SET_FULL_SCREEN';
const SET_PLAYER = 'scratch-gui/mode/SET_PLAYER';

test('initialState', () => {
    let defaultState;
    /* modeReducer(state, action) */
    expect(modeReducer(defaultState, {type: 'anything'})).toBeDefined();
});

test('set full screen mode', () => {
    const previousState = {
        showBranding: false,
        isFullScreen: false,
        isPlayerOnly: false,
        hasEverEnteredEditor: true
    };
    const action = {
        type: SET_FULL_SCREEN,
        isFullScreen: true
    };
    const newState = {
        showBranding: false,
        isFullScreen: true,
        isPlayerOnly: false,
        hasEverEnteredEditor: true
    };
    /* modeReducer(state, action) */
    expect(modeReducer(previousState, action)).toEqual(newState);
});

test('set player mode', () => {
    const previousState = {
        showBranding: false,
        isFullScreen: false,
        isPlayerOnly: false,
        hasEverEnteredEditor: true
    };
    const action = {
        type: SET_PLAYER,
        isPlayerOnly: true
    };
    const newState = {
        showBranding: false,
        isFullScreen: false,
        isPlayerOnly: true,
        hasEverEnteredEditor: true
    };
    /* modeReducer(state, action) */
    expect(modeReducer(previousState, action)).toEqual(newState);
});
