import {
    SUCCESS_REQUEST,
    BAD_REQUEST,
    GET_REQUEST
} from '../utils/types'

const INITIAL_STATE = {
    searchedUsers: [],
    isRequest: false,
    isSuccess: false,
    isError: false
}

export default function userSearch(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_REQUEST: {
            return {
                ...state,
                isRequest: true,
                isSuccess: false,
                isError: false
            }
        }
        case SUCCESS_REQUEST: {
            return {
                ...state,
                searchedUsers: action.users,
                isRequest:false,
                isSuccess:true,
                isError:false
            }
        }
        case BAD_REQUEST:{
            return{
                ...state,
                isRequest:false,
                isSuccess:false,
                isError:true
            }
        }
        default:
            return state;
    }
}