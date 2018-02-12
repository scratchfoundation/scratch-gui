import {combineReducers} from 'redux';
import intlReducer from './intl';
import {GuiReducer, ScratchPaintReducer} from '../index';

export default combineReducers({
    intl: intlReducer,
    gui: GuiReducer,
    scratchPaint: ScratchPaintReducer
});
