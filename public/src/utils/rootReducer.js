import {combineReducers} from 'redux'
import  user from '../reducers/user'
import  tab from '../reducers/headerTab'
import userSearch from '../reducers/userSearch'
export default combineReducers({
    user,
    userSearch,
    tab
});