import {applyMiddleware, compose, combineReducers} from 'redux';
import assetDragReducer, {assetDragInitialState} from './asset-drag';
import cardsReducer, {cardsInitialState} from './cards';
import colorPickerReducer, {colorPickerInitialState} from './color-picker';
import customProceduresReducer, {customProceduresInitialState} from './custom-procedures';
import blockDragReducer, {blockDragInitialState} from './block-drag';
import editorTabReducer, {editorTabInitialState} from './editor-tab';
import hoveredTargetReducer, {hoveredTargetInitialState} from './hovered-target';
import menuReducer, {menuInitialState} from './menus';
import modalReducer, {modalsInitialState} from './modals';
import modeReducer, {modeInitialState} from './mode';
import monitorReducer, {monitorsInitialState} from './monitors';
import monitorLayoutReducer, {monitorLayoutInitialState} from './monitor-layout';
import restoreDeletionReducer, {restoreDeletionInitialState} from './restore-deletion';
import stageSizeReducer, {stageSizeInitialState} from './stage-size';
import targetReducer, {targetsInitialState} from './targets';
import toolboxReducer, {toolboxInitialState} from './toolbox';
import vmReducer, {vmInitialState} from './vm';
import vmStatusReducer, {vmStatusInitialState} from './vm-status';
import throttle from 'redux-throttle';

const guiMiddleware = compose(applyMiddleware(throttle(300, {leading: true, trailing: true})));

const guiInitialState = {
    assetDrag: assetDragInitialState,
    blockDrag: blockDragInitialState,
    cards: cardsInitialState,
    colorPicker: colorPickerInitialState,
    customProcedures: customProceduresInitialState,
    editorTab: editorTabInitialState,
    mode: modeInitialState,
    hoveredTarget: hoveredTargetInitialState,
    stageSize: stageSizeInitialState,
    menus: menuInitialState,
    modals: modalsInitialState,
    monitors: monitorsInitialState,
    monitorLayout: monitorLayoutInitialState,
    restoreDeletion: restoreDeletionInitialState,
    targets: targetsInitialState,
    toolbox: toolboxInitialState,
    vm: vmInitialState,
    vmStatus: vmStatusInitialState
};

const initPlayer = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: currentState.mode.isFullScreen,
            isPlayerOnly: true
        }}
    );
};
const initFullScreen = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: true,
            isPlayerOnly: currentState.mode.isPlayerOnly
        }}
    );
};

const guiReducer = combineReducers({
    assetDrag: assetDragReducer,
    blockDrag: blockDragReducer,
    cards: cardsReducer,
    colorPicker: colorPickerReducer,
    customProcedures: customProceduresReducer,
    editorTab: editorTabReducer,
    mode: modeReducer,
    hoveredTarget: hoveredTargetReducer,
    stageSize: stageSizeReducer,
    menus: menuReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    restoreDeletion: restoreDeletionReducer,
    targets: targetReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    vmStatus: vmStatusReducer
});

export {
    guiReducer as default,
    guiInitialState,
    guiMiddleware,
    initFullScreen,
    initPlayer
};
