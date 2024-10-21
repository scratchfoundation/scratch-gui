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
import projectChangedReducer, {projectChangedInitialState} from './project-changed';
import projectStateReducer, {projectStateInitialState} from './project-state';
import projectTitleReducer, {projectTitleInitialState} from './project-title';
import fontsLoadedReducer, {fontsLoadedInitialState} from './fonts-loaded';
import restoreDeletionReducer, {restoreDeletionInitialState} from './restore-deletion';
import stageSizeReducer, {stageSizeInitialState} from './stage-size';
import targetReducer, {targetsInitialState} from './targets';
import themeReducer, {themeInitialState} from './theme';
import timeoutReducer, {timeoutInitialState} from './timeout';
import timeTravelReducer, {timeTravelInitialState} from './time-travel';
import toolboxReducer, {toolboxInitialState} from './toolbox';
import vmReducer, {vmInitialState} from './vm';
import vmStatusReducer, {vmStatusInitialState} from './vm-status';
import workspaceMetricsReducer, {workspaceMetricsInitialState} from './workspace-metrics';
import throttle from 'redux-throttle';

import decks from '../lib/libraries/decks/index.jsx';

const checkActionMiddleware = (/* store */) => (
    next => (
        action => {
            if (action === null || typeof action === 'undefined') {
                // something like this might help with debugging:
                // console.log('Redux state at time of missing action:', store.getState());
                throw new Error('Missing action in middleware. Invalid state transition?');
            }
            // if action is null or undefined then this call probably would have thrown anyway
            return next(action);
        }
    )
);

const guiMiddleware = compose(applyMiddleware(
    checkActionMiddleware,
    throttle(300, {leading: true, trailing: true})
));

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
    projectChanged: projectChangedInitialState,
    projectState: projectStateInitialState,
    projectTitle: projectTitleInitialState,
    fontsLoaded: fontsLoadedInitialState,
    restoreDeletion: restoreDeletionInitialState,
    targets: targetsInitialState,
    theme: themeInitialState,
    timeout: timeoutInitialState,
    timeTravel: timeTravelInitialState,
    toolbox: toolboxInitialState,
    vm: vmInitialState,
    vmStatus: vmStatusInitialState,
    workspaceMetrics: workspaceMetricsInitialState
};

const initPlayer = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: currentState.mode.isFullScreen,
            isPlayerOnly: true,
            // When initializing in player mode, make sure to reset
            // hasEverEnteredEditorMode
            hasEverEnteredEditor: false
        }}
    );
};
const initFullScreen = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            isFullScreen: true,
            isPlayerOnly: currentState.mode.isPlayerOnly,
            hasEverEnteredEditor: currentState.mode.hasEverEnteredEditor
        }}
    );
};

const initEmbedded = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {mode: {
            showBranding: true,
            isFullScreen: true,
            isPlayerOnly: true,
            hasEverEnteredEditor: false
        }}
    );
};

const initTutorialCard = function (currentState, deckId) {
    return Object.assign(
        {},
        currentState,
        {
            cards: {
                visible: true,
                content: decks,
                activeDeckId: deckId,
                expanded: true,
                step: 0,
                x: 0,
                y: 0,
                dragging: false
            }
        }
    );
};

const initTelemetryModal = function (currentState) {
    return Object.assign(
        {},
        currentState,
        {
            modals: {
                telemetryModal: true // this key must match `MODAL_TELEMETRY` in modals.js
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
    projectChanged: projectChangedReducer,
    projectState: projectStateReducer,
    projectTitle: projectTitleReducer,
    fontsLoaded: fontsLoadedReducer,
    restoreDeletion: restoreDeletionReducer,
    targets: targetReducer,
    theme: themeReducer,
    timeout: timeoutReducer,
    timeTravel: timeTravelReducer,
    toolbox: toolboxReducer,
    vm: vmReducer,
    vmStatus: vmStatusReducer,
    workspaceMetrics: workspaceMetricsReducer
});

export {
    guiReducer as default,
    guiInitialState,
    guiMiddleware,
    initEmbedded,
    initFullScreen,
    initPlayer,
    initTelemetryModal,
    initTutorialCard
};
