const ACTIVATE_TAB = 'scratch-gui/navigation/ACTIVATE_TAB';
const BLOCK = 'BLOCK_TAB'
const SETTINGS = 'SETTINGS_TAB'

// Constants use numbers to make it easier to work with react-tabs
const BLOCKS_TAB_INDEX = 0;
const SETTINGS_TAB_INDEX = 1;
const PARAMETERS_TAB_INDEX = 0;
const COSTUMES_TAB_INDEX = 1;
const SOUNDS_TAB_INDEX = 2;

const initialState = {
    [BLOCK]: {
        activeTabIndex: BLOCKS_TAB_INDEX
    },
    [SETTINGS]: {
        activateTabIndex: PARAMETERS_TAB_INDEX
    }
};



const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case ACTIVATE_TAB:
            // console.log({ ...state, [action.screenType]: { activeTabIndex: action.activeTabIndex } })
            return { ...state, [action.screenType]: { activeTabIndex: action.activeTabIndex } }
        // return Object.assign({}, state, {
        //     activeTabIndex: action.activeTabIndex
        // });
        default:
            return state;
    }
};

const activateTab = function (tab, screen) {
    return {
        type: ACTIVATE_TAB,
        screenType: screen,
        activeTabIndex: tab
    };
}


export {
    reducer as default,
    initialState as editorTabInitialState,
    activateTab,
    SETTINGS_TAB_INDEX,
    BLOCKS_TAB_INDEX,
    PARAMETERS_TAB_INDEX,
    COSTUMES_TAB_INDEX,
    SOUNDS_TAB_INDEX,
    BLOCK,
    SETTINGS
};
