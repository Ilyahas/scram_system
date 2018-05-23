import { createReducer } from 'redux-act'
import { dashboardActions } from '../utils/types'
import {
  createCard,
  createCardFailed,
  createCardRequest,
  deleteCardAction,
  deleteCardFailed,
  deleteCardRequest,
  getAllDashboards,
  getAllDashboardsFailed,
  getAllDashboardsRequest,
  createTeamDashboardSucceed,
  createDashboardSucceed,
  getTeamDashboardSuccees,
} from '../actions/dashboard'

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
    case dashboardActions.ADD_NEW_LANE: {
      const newLanes = state.lanes.concat(action.data)
      return updateObject(state, { lanes: newLanes })
    }
    case dashboardActions.CLEAR_LANES: {
      return updateObject(state, { lanes: [] })
    }
    default:
      return state
  }
}
export function lane(state = INITIAL_STATE, action) {
  switch (action.type) {
    case dashboardActions.CREATE_LANE_REQUEST: {
      return requestStart(state)
    }
    case dashboardActions.CREATE_LANE_FAILED: {
      return requestFailed(state)
    }
    case dashboardActions.CREATE_LANE_SUCCESS: {
      return requestSuccess(state)
    }
    default:
      return state
  }
}

export const card = createReducer(
  {
    [createCard]: state => requestSuccess(state),
    [createCardRequest]: state => requestStart(state),
    [createCardFailed]: state => requestFailed(state),
  },
  INITIAL_STATE,
)
const DASHBOARDS_INITIAL_STATE = {
  lanes: [],
  isSuccess: false,
  isError: false,
  isRequested: false,
  dashboards: [],
  teamDashboard: [],
}
export const allDashboards = createReducer(
  {
    [getAllDashboards]: (state, payload) => ({ ...requestSuccess(state), dashboards: payload }),
    [getAllDashboardsFailed]: state => requestFailed(state),
    [getAllDashboardsRequest]: state => requestStart(state),
    [createDashboardSucceed]: (state, payload) => {
      const newDasnhoard = Object.assign([], state.dashboards)
      const index = newDasnhoard.findIndex(item => item._id === payload.teamId)
      const copySearcgeObj = Object.assign({}, newDasnhoard[index])
      copySearcgeObj.dashboards = copySearcgeObj.dashboards.concat(payload)
      newDasnhoard[index] = copySearcgeObj
      return updateObject({ ...state, ...requestSuccess(state), dashboards: newDasnhoard })
    },
    [createTeamDashboardSucceed]: (state, payload) => {
      const newTeam = Object.assign([], state.teamDashboard)
      newTeam[0].dashboards = newTeam[0].dashboards.concat(payload)
      return ({ ...state, ...requestSuccess(state), teamDashboard: newTeam })
    },
    [getTeamDashboardSuccees]: (state, payload) => ({ ...state, ...requestSuccess(state), teamDashboard: payload }),
  },
  DASHBOARDS_INITIAL_STATE,
)

export const deleteCard = createReducer(
  {
    [deleteCardAction]: state => requestSuccess(state),
    [deleteCardFailed]: state => requestFailed(state),
    [deleteCardRequest]: state => requestStart(state),
  },
  INITIAL_STATE,
)
