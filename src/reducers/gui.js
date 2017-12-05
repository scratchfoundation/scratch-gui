import {combineReducers} from 'redux';
import colorPickerReducer from './color-picker';
import customProceduresReducer from './custom-procedures';
import intlReducer from './intl';
import modalReducer from './modals';
import monitorReducer from './monitors';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';
import {ScratchPaintReducer} from 'scratch-paint';

export default combineReducers({
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    intl: intlReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    scratchPaint: ScratchPaintReducer
});
