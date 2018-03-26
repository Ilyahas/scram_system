import {
    SUCCESS_REQUEST
    , START_REQUEST
    , BAD_REQUEST
    , LOG_IN
    , REFRESH_TOKEN
    , CONFIRM_EMAIL
} from '../utils/types'

const INITIAL_STATE = {
    isEmailConfirmed:false,
    isLoading: true,
    isSuccess: false,
    isError: false,
    isLogin: false,
    name: "user_name",
    email: "user_email",
    token: 'token',
    avatar: "avatar",
    errorMessage: {}
}

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case START_REQUEST: {
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false
            }
        }
        case SUCCESS_REQUEST: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isError:false
            }
        }
        case BAD_REQUEST: {
            return {
                ...state,
                isError: true,
                errorMessage: action.errorMessage,
            }
        }
        case LOG_IN: {
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isLogin: true,
                isError:false,
                name: action.nickname,
                email: action.email,
                token: action.token
            }
        }
        case REFRESH_TOKEN:{
            return{
                ...state,
                token:action.token
            }
        }
        case CONFIRM_EMAIL :{
            return{
                ...state,
                isEmailConfirmed:true,
                isLoading: false,
                isSuccess: true,
                isError:false
            }
        }
        default:
            return state
    }
}