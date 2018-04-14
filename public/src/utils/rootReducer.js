import {combineReducers} from 'redux'
import  user from '../reducers/user'
import userSearch from '../reducers/userSearch'
export default combineReducers({
    user,
    userSearch,
});