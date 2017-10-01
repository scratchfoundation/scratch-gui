import {combineReducers} from 'redux';
import colorPickerReducer from './color-picker';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';
import zoomReducer from './zoom';

export default combineReducers({
    colorPicker: colorPickerReducer,
    intl: intlReducer,
    isZoomed: zoomReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer
});
