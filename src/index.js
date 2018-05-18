import GUI from './containers/gui.jsx';
import GuiReducer, {guiInitialState, initFullScreen, initPlayer} from './reducers/gui';
import {ScratchPaintReducer} from 'scratch-paint';
import IntlReducer from './reducers/intl';
import {setFullScreen, setPlayer} from './reducers/mode';
import {setAppElement} from 'react-modal';
import {applyMiddleware, compose} from 'redux';
import throttle from 'redux-throttle';

const guiReducers = {
    intl: IntlReducer,
    scratchGui: GuiReducer,
    scratchPaint: ScratchPaintReducer
};

const guiMiddleware = compose(applyMiddleware(throttle(300, {leading: true, trailing: true})));

export {
    GUI as default,
    setAppElement,
    guiReducers,
    guiInitialState,
    guiMiddleware,
    initPlayer,
    initFullScreen,
    setFullScreen,
    setPlayer
};
