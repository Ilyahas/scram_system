import {TAB_CHANGED} from '../utils/types'

const INITIAL_STATE={
    index:0
}

export default function tab(state = INITIAL_STATE,action){
    switch(action.type){
        case TAB_CHANGED:{
            return{
                ...state,
                index:action.index
            }
        }
        default:{
            return state;
        }
    }
}