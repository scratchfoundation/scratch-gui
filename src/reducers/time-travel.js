const SET_TIME_TRAVEL = 'scratch-gui/time-travel/SET_TIME_TRAVEL';
const initialState = {
    year: 'NOW'
};

const NOW = 'NOW';
const YEAR_2020 = '2020';
const YEAR_2019 = '2019';
const YEAR_1990 = '1990';
const YEAR_1920 = '1920';

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

const setTimeTravel2019 = function () {
    window.localStorage.worldStage = true;
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_2019
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
const isTimeTravel2019 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_2019;
};
const setTimeTravel2020 = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: YEAR_2020
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

const isTimeTravel2020 = function (state) {
    return state.scratchGui.timeTravel.year === YEAR_2020;
};

const setTimeTravelNow = function () {
    return {
        type: SET_TIME_TRAVEL,
        year: NOW
    };
};
const isTimeTravelNow = function (state) {
    return state.scratchGui.timeTravel.year === NOW;
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
    isTimeTravel1920,
    isTimeTravel1990,
    isTimeTravel2019,
    isTimeTravel2020,
    isTimeTravelNow,
    setTimeTravel1920,
    setTimeTravel1990,
    setTimeTravel2019,
    setTimeTravel2020,
    setTimeTravelNow,
    setTimeTravel
};
