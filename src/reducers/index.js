import { combineReducers } from 'redux';
import db from './db';
import local from './local';

export default combineReducers({
    db,
    local,
});
