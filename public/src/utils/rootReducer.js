import {combineReducers} from 'redux'
import  user from '../reducers/user'
import  tab from '../reducers/headerTab'
export default combineReducers({
    user,
    tab
});