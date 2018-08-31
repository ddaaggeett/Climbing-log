import { combineReducers } from 'redux';
import user from './user';
import views from './views';

export default combineReducers({
    user,
    views,
});
