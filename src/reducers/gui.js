import {applyMiddleware, compose, combineReducers} from 'redux';
import alertsReducer, {alertsInitialState} from './alerts';
import assetDragReducer, {assetDragInitialState} from './asset-drag';
import cardsReducer, {cardsInitialState} from './cards';
import colorPickerReducer, {colorPickerInitialState} from './color-picker';
import connectionModalReducer, {connectionModalInitialState} from './connection-modal';
import customProceduresReducer, {customProceduresInitialState} from './custom-procedures';
import blockDragReducer, {blockDragInitialState} from './block-drag';
import editorTabReducer, {editorTabInitialState} from './editor-tab';
import hoveredTargetReducer, {hoveredTargetInitialState} from './hovered-target';
import menuReducer, {menuInitialState} from './menus';
import micIndicatorReducer, {micIndicatorInitialState} from './mic-indicator';
import modalReducer, {modalsInitialState} from './modals';
import modeReducer, {modeInitialState} from './mode';
import monitorReducer, {monitorsInitialState} from './monitors';
import monitorLayoutReducer, {monitorLayoutInitialState} from './monitor-layout';
import projectStateReducer, {projectStateInitialState} from './project-state';
import projectTitleReducer, {projectTitleInitialState} from './project-title';
import restoreDeletionReducer, {restoreDeletionInitialState} from './restore-deletion';
import stageSizeReducer, {stageSizeInitialState} from './stage-size';
import targetReducer, {targetsInitialState} from './targets';
import toolboxReducer, {toolboxInitialState} from './toolbox';
import vmReducer, {vmInitialState} from './vm';
import vmStatusReducer, {vmStatusInitialState} from './vm-status';
import throttle from 'redux-throttle';

import decks from '../lib/libraries/decks/index.jsx';

const guiMiddleware = compose(applyMiddleware(throttle(300, {leading: true, trailing: true})));

const guiInitialState = {
    alerts: alertsInitialState,
    assetDrag: assetDragInitialState,
    blockDrag: blockDragInitialState,
    cards: cardsInitialState,
    colorPicker: colorPickerInitialState,
    connectionModal: connectionModalInitialState,
    customProcedures: customProceduresInitialState,
    editorTab: editorTabInitialState,
    mode: modeInitialState,
    hoveredTarget: hoveredTargetInitialState,
    stageSize: stageSizeInitialState,
    menus: menuInitialState,
    micIndicator: micIndicatorInitialState,
    modals: modalsInitialState,
    monitors: monitorsInitialState,
    monitorLayout: monitorLayoutInitialState,
    projectState: projectStateInitialState,
    projectTitle: projectTitleInitialState,
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

const initTutorialCard = function (currentState, deckId) {
    return Object.assign(
        {},
        currentState,
        {
            modals: {
                previewInfo: false
            },
            cards: {
                visible: true,
                content: decks,
                activeDeckId: deckId,
                step: 0,
                x: 0,
                y: 0,
                dragging: false
            }
        }
    );
};

const initTutorialLibrary = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {
            modals: {
                previewInfo: false,
                tipsLibrary: true
            }
        }
    );
};

const guiReducer = combineReducers({
    alerts: alertsReducer,
    assetDrag: assetDragReducer,
    blockDrag: blockDragReducer,
    cards: cardsReducer,
    colorPicker: colorPickerReducer,
    connectionModal: connectionModalReducer,
    customProcedures: customProceduresReducer,
    editorTab: editorTabReducer,
    mode: modeReducer,
    hoveredTarget: hoveredTargetReducer,
    stageSize: stageSizeReducer,
    menus: menuReducer,
    micIndicator: micIndicatorReducer,
    modals: modalReducer,
    monitors: monitorReducer,
    monitorLayout: monitorLayoutReducer,
    projectState: projectStateReducer,
    projectTitle: projectTitleReducer,
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
    initPlayer,
    initTutorialCard,
    initTutorialLibrary
};
