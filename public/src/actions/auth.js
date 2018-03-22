import { USER_LOGGED_IN, USER_SIGNUP } from '../utils/types';
import api from '../utils/api'
export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})
export const userSignup = (user) => ({
    type: USER_SIGNUP,
    user
})

export const login = credentials => dispatch => api.user.login(credentials)
    .then((user) => {
        localStorage.JWT = user.token
        dispatch(userLoggedIn(user))
    })
export const signup = credentials => async dispatch => {
    try {
        let userSignUpStatus = await api.user.signup(credentials);
        dispatch(userSignup(userSignUpStatus))
    } catch (error) {
        throw new Error(error)
    }
}
