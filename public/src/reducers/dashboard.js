import { dashboardActions } from '../utils/types'

const INITIAL_STATE = {
  lanes: [],
  isSuccess: false,
  isError: false,
  isRequested: false,
}
function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}
function requestStart(state) {
  const startRequestes = {
    isRequested: true,
    isSuccess: false,
    isError: false,
  }
  return updateObject(state, startRequestes)
}
function requestSuccess(state) {
  const successObj = {
    isRequested: false,
    isSuccess: true,
    isError: false,
  }
  return updateObject(state, successObj)
}
function requestFailed(state) {
  const failedObj = {
    isError: true,
    isSuccess: false,
    isRequested: false,
  }
  return updateObject(state, failedObj)
}
export function createCard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case dashboardActions.CREATE_CARD_REQUEST: {
      return requestStart(state)
    }
    case dashboardActions.CREATE_CARD_SUCCESS: {
      return requestSuccess(state)
    }
    case dashboardActions.CREATE_CARD_FAILED: {
      return requestFailed(state)
    }
    default:
      return state
  }
}

export function deleteCard(state = INITIAL_STATE, action) {}

export function dashboard(state = INITIAL_STATE, action) {
  switch (action.type) {
    case dashboardActions.GET_BOARD_REQUEST: {
      return requestStart(state)
    }
    case dashboardActions.GET_BOARD_FAILED: {
      return requestFailed(state)
    }
    case dashboardActions.GET_BOARD_SUCCESS: {
      return {
        ...requestSuccess(state),
        lanes: action.data,
      }
    }
    default:
      return state
  }
}
