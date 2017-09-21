import {combineReducers} from 'redux';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';
import zoomReducer from './zoom';


export default combineReducers({
    intl: intlReducer,
    isZoomed: zoomReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer
});
