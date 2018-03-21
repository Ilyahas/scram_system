import { USER_LOGGED_IN, USER_SIGNUP } from '../utils/types';
import api from '../utils/api'
export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})
export const userSignedup = () => ({
    type: USER_SIGNUP
})

export const login = credentials => dispatch => api.user.login(credentials)
    .then((user) => {
        localStorage.JWT = user.token
        dispatch(userLoggedIn(user))
    })
export const signup = () => dispatch => api.user.signup()
    .then(() => {
        dispatch(userSignedup())
    }
    )
