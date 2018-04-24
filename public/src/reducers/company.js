import { companyActions } from '../utils/types'

const INITIAL_STATE = {
  companyName: '',
  owner: '',
  id: '',
  listOfTeams: [],
  isSuccess: false,
  isError: false,
  isRequested: false,
}
export default function company(state = INITIAL_STATE, action) {
  switch (action.type) {
    case companyActions.CREATE_TEAM_REQUEST: {
      return {
        ...state,
        isRequested: true,
        isSuccess: false,
        isError: false,
      }
    }
    case companyActions.CREATE_TEAM_SUCCESS: {
      return {
        ...state,
        isRequested: false,
        isSuccess: true,
        isError: false,
      }
    }
    case companyActions.CREATE_TEAM_FAILED: {
      return {
        ...state,
        isRequested: false,
        isSuccess: false,
        isError: true,
      }
    }
    case companyActions.GET_COMPANY_REQUEST: {
      return {
        ...state,
        isRequested: true,
        isSuccess: false,
        isError: false,
      }
    }
    case companyActions.GET_COMPANY_FAILED: {
      return {
        ...state,
        isRequested: false,
        isSuccess: false,
        isError: true,
      }
    }
    case companyActions.GET_COMPANY_SUCCESS: {
      return {
        ...state,
        companyName: action.data.companyName,
        owner: action.data.owner,
        listOfTeams: action.data.listOfTeams,
        id: action.data._id,
        isRequested: false,
        isSuccess: false,
        isError: false,
      }
    }
    default:
      return state
  }
}
