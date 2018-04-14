import {
    SUCCESS_REQUEST
    , START_REQUEST
    , BAD_REQUEST
    , LOG_IN
    , REFRESH_TOKEN
    , CONFIRM_EMAIL
    , VERIFY_TOKEN
    , VERIFY_TOKEN_FAILED
} from '../utils/types';
//TODO: logout action
import api from '../utils/api'
export const userLoggedIn = (user) => ({
    type: LOG_IN,
    user
})
export const userSignup = () => ({
    type: SUCCESS_REQUEST,
})
export const userStartRequest = () => ({
    type: START_REQUEST
})
export const badRequest = (errorMessage) => ({
    type: BAD_REQUEST,
    errorMessage
})
export const emailSuccsessfullyConfirmed = () => ({
    type: CONFIRM_EMAIL
})
export const refreshToken = (token) => ({
    type: REFRESH_TOKEN,
    token
})
export const verifyTokenExp = () => ({
    type: VERIFY_TOKEN
})
export const verifyTokenFailed = () => ({
    type: VERIFY_TOKEN_FAILED
})
export const login = credentials => async dispatch => {
    try {
        dispatch(userStartRequest())
        let response = await api.user.login(credentials);
        localStorage.JWT = response.data.requestResult.token
        dispatch(userLoggedIn(response.data.requestResult.user));
    } catch (error) {
        console.log("gg=" + error)
        dispatch(badRequest(error.response.data.requestResult))
    }
}
export const signup = credentials => async dispatch => {
    try {
        dispatch(userStartRequest())
        await api.user.signup(credentials);
        dispatch(userSignup())
    } catch (error) {
        console.log("gg=" + error)
        dispatch(badRequest(error.response.data.requestResult))

    }
}
export const emailConfirm = token => async dispatch => {
    try {
        dispatch(userStartRequest())
        await api.user.confirmEmail(token)
        dispatch(emailSuccsessfullyConfirmed())
    } catch (error) {
        dispatch(badRequest(error.response.data.requestStatus))
    }
}
export const verifyToken = token => async dispatch => {
    try {
        dispatch(userStartRequest())
        let data = await api.user.tokenExp(token)
        dispatch(verifyTokenExp())
    } catch (error) {
        dispatch(verifyTokenFailed())
    }
}
export const token = token => dispatch => {
    dispatch(refreshToken(token))
}
