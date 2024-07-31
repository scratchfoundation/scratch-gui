import {combineReducers} from 'redux';
import authReducer from './auth';
import otherReducers from './otherReducers';

export default combineReducers({
    auth: authReducer,
    ...otherReducers
});

