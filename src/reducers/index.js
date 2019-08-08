import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';

export default combineReducers({
    user: AuthReducer,
});
