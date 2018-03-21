import {USER_LOGGED_IN,USER_SIGNEDUP} from '../utils/types'

export default function user(state={},action){
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_SIGNEDUP:
            return {};
        default:
            return state;
    }
}