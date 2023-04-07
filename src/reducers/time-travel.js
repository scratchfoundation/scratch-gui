const SET_TIME_TRAVEL = 'scratch-gui/time-travel/SET_TIME_TRAVEL';
const initialState = {
    year: 'NOW'
};

const NOW = 'NOW';
const YEAR_2020 = '2020';
const YEAR_1990 = '1990';
const YEAR_1920 = '1920';
const YEAR_220022BC = '220022BC';

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

const isTimeTravel220022BC = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_220022BC;
};
const setTimeTravel220022BC = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_220022BC
    };
};

const isTimeTravel1920 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_1920;
};
const setTimeTravel1920 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_1920
    };
};

const isTimeTravel1990 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_1990;
};
const setTimeTravel1990 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_1990
    };
};


const isTimeTravel2020 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_2020;
};
const setTimeTravel2020 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_2020
    };
};

const isTimeTravelNow = function (state) {
    return state.scratchGui.timeTravel.year === NOW;
};
const setTimeTravelNow = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: NOW
    };
};

const setTimeTravel = function (mode) {
    return {
        type: SET_TIME_TRAVEL,
        year: mode
    };
};

export {
    reducer as default,
    initialState as timeTravelInitialState,
    isTimeTravel220022BC,
    isTimeTravel1920,
    isTimeTravel1990,
    isTimeTravel2020,
    isTimeTravelNow,
    setTimeTravel220022BC,
    setTimeTravel1920,
    setTimeTravel1990,
    setTimeTravel2020,
    setTimeTravelNow,
    setTimeTravel
};
