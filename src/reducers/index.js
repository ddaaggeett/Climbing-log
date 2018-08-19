import { combineReducers } from 'redux';
import user from './user';
import local from './local';

export default combineReducers({
    user,
    local,
});
