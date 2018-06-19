import GUI from './containers/gui.jsx';
import GuiReducer, {guiInitialState, guiMiddleware, initFullScreen, initPlayer, initLocale} from './reducers/gui';
import {ScratchPaintReducer} from 'scratch-paint';
import {setFullScreen, setPlayer} from './reducers/mode';
import {setAppElement} from 'react-modal';

const guiReducers = {
    scratchGui: GuiReducer,
    scratchPaint: ScratchPaintReducer
};

export {
    GUI as default,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initPlayer,
    initFullScreen,
    initLocale,
    setFullScreen,
    setPlayer
};
