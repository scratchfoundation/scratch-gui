const SET_TIME_TRAVEL = 'scratch-gui/time-travel/SET_TIME_TRAVEL';
const initialState = {
    year: 'NOW'
};

const NOW = 'NOW';
const YEAR_2020 = 'YEAR_2020';

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SET_TIME_TRAVEL:
        return Object.assign({}, state, {
            year: action.year
        });
    default:
        return state;
    }
};

const setTimeTravel2020 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_2020
    };
};
const isTimeTravel2020 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_2020;
};

const setTimeTravelNow = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: NOW
    };
};

export {
    reducer as default,
    initialState as timeTravelInitialState,
    isTimeTravel2020,
    setTimeTravel2020,
    setTimeTravelNow
};
