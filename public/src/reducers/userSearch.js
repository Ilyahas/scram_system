import {
    GET_LIST_USERS,
    GET_LIST_USERS_BAD_REQUEST,
    GET_LIST_USERS_SUCCESS
} from '../utils/types'

const INITIAL_STATE = {
    searchedUsers: [],
    isRequest: false,
    isSuccess: false,
    isError: false
}

export default function userSearch(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LIST_USERS: {
            return {
                ...state,
                isRequest: true,
                isSuccess: false,
                isError: false
            }
        }
        case GET_LIST_USERS_SUCCESS: {
            return {
                ...state,
                searchedUsers: action.users,
                isRequest: false,
                isSuccess: true,
                isError: false
            }
        }
        case GET_LIST_USERS_BAD_REQUEST: {
            return {
                ...state,
                isRequest: false,
                isSuccess: false,
                isError: true
            }
        }
        default:
            return state;
    }
}