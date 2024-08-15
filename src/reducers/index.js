import { combineReducers } from 'redux';
import authReducer from './auth';
import sessionReducer from './session'; // 새로 추가된 세션 리듀서
import otherReducers from './otherReducers';
import menus from './menus';

const rootReducer = combineReducers({
    menus,
    // 다른 리듀서 추가 가능
});

export default combineReducers({
    auth: authReducer,
    session: sessionReducer, // 새로 추가된 세션 리듀서
    ...otherReducers
});
