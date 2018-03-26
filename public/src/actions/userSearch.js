import api from '../utils/api'
import * as actions from './postActions'
//TODO: test 
export const userList = query => async dispatch => {
    try {
        dispatch(actions.startRequest())
        let users = await api.searchUsers.search(query)
        dispatch(
            actions.successRequest(
                actions.helperGetRespMessage(users)
            )
        )
    } catch (e) {
        dispatch(
            actions.badRequest(
                actions.helperGetErrMessage(e)
            )
        )
    }
}

