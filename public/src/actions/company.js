import { companyActions } from '../utils/types';
import api from '../utils/api';

export const newTeam = () => ({
  type: companyActions.CREATE_TEAM_REQUEST,
});
export const teamCreated = (data) => ({
  type: companyActions.CREATE_TEAM_SUCCESS,
  data,
});
export const createTeamFailed = () => ({
  type: companyActions.CREATE_TEAM_FAILED,
});
export const companyInfoRequest = () => ({
  type: companyActions.GET_COMPANY_REQUEST,
});
export const companyInfoFailed = () => ({
  type: companyActions.GET_COMPANY_FAILED,
});
export const companyInfo = data => ({
  type: companyActions.GET_COMPANY_SUCCESS,
  data,
});

export const getCompany = () => async (dispatch) => {
  try {
    dispatch(companyInfoRequest());
    const company = await api.company.get();
    localStorage.companyId = company.data.requestResult._id
    dispatch(companyInfo(company.data.requestResult));
  } catch (error) {
    dispatch(companyInfoFailed());
  }
};
export const createTeam = (id, data) => async (dispatch) => {
  try {
    dispatch(newTeam());
    let team = await api.company.createTeam(id, data);
    team = team.data.requestResult
    dispatch(teamCreated(team));
  } catch (error) {
    dispatch(createTeamFailed());
  }
};
