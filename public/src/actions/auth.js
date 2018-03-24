import {
    SUCCESS_REQUEST
    , START_REQUEST
    , BAD_REQUEST
    , LOG_IN
    , REFRESH_TOKEN
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
export const refreshToken = (token) => ({
    type: REFRESH_TOKEN,
    token
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
        dispatch(badRequest(error.response.data.requestResult.error))

    }
}
export const token = token => dispatch=>{
    dispatch(refreshToken(token))
}
