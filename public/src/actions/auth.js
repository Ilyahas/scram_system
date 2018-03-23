import  {SUCCESS_REQUEST,START_REQUEST,BAD_REQUEST,LOG_IN}  from '../utils/types';
import api from '../utils/api'
export const userLoggedIn = (user) => ({
    type: LOG_IN,
    user
})
export const userSignup = () => ({
    type: SUCCESS_REQUEST,
    
})
export const userStartRequest = ()=>({
    type:START_REQUEST
})
export const badRequest =(errorMessage)=>({
    type:BAD_REQUEST,
    errorMessage
})
export const login = credentials => dispatch => api.user.login(credentials)
    .then((user) => {
        localStorage.JWT = user.token
        dispatch(userLoggedIn(user))
    })
export const signup = credentials => async dispatch => {
    try {
        dispatch(userStartRequest())
        await api.user.signup(credentials);
        dispatch(userSignup())
    } catch (error) {
        console.log("gg="+error)
        dispatch(badRequest(error.response.data.requestResult))
        
    }
}
