import {combineReducers} from 'redux';
import cardsReducer from './cards';
import colorPickerReducer from './color-picker';
import customProceduresReducer from './custom-procedures';
import blockDragReducer from './block-drag';
import editorTabReducer from './editor-tab';
import hoveredTargetReducer from './hovered-target';
import intlReducer from './intl';
import menuReducer from './menus';
import modalReducer from './modals';
import modeReducer from './mode';
import monitorReducer from './monitors';
import monitorLayoutReducer from './monitor-layout';
import targetReducer from './targets';
import toolboxReducer from './toolbox';
import vmReducer from './vm';
import stageSizeReducer from './stage-size';
import {ScratchPaintReducer} from 'scratch-paint';

export default combineReducers({
    blockDrag: blockDragReducer,
    cards: cardsReducer,
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    editorTab: editorTabReducer,
    mode: modeReducer,
    hoveredTarget: hoveredTargetReducer,
    intl: intlReducer,
    stageSize: stageSizeReducer,
    menus: menuReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    scratchPaint: ScratchPaintReducer
});
