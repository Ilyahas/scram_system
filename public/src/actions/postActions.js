import {
    SUCCESS_REQUEST,
    BAD_REQUEST,
    START_REQUEST
} from '../utils/types';

export const helperGetErrMessage = err => err
    .response
    .data
    .requestResult
    .error
export const helperGetRespMessage = response => response
    .data
    .requestResult
export const startRequest = () => ({
    type: START_REQUEST
})
export const successRequest = (data) => ({
    type: SUCCESS_REQUEST,
    data
})
export const badRequest = (errorMessage) => ({
    type: BAD_REQUEST,
    errorMessage
})

