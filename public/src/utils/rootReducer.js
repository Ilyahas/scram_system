import { combineReducers } from 'redux'
import user from '../reducers/user'
import company from '../reducers/company'
import userSearch from '../reducers/userSearch'

export default combineReducers({
  user,
  company,
  userSearch,
})
