import {combineReducers} from 'redux';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';


export default combineReducers({
    intl: intlReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer
});
