import api from '../utils/api';

import {
  GET_LIST_USERS,
  GET_LIST_USERS_BAD_REQUEST,
  GET_LIST_USERS_SUCCESS,
} from '../utils/types';

export const getListUsersStart = () => ({
  type: GET_LIST_USERS,
});
export const getListUsersSuccess = users => ({
  type: GET_LIST_USERS_SUCCESS,
  users,
});
export const getListUsersError = () => ({
  type: GET_LIST_USERS_BAD_REQUEST,
});
export const userList = query => async (dispatch) => {
  try {
    dispatch(getListUsersStart());
    const response = await api.user.list(query);
    dispatch(getListUsersSuccess(response));
  } catch (e) {
    dispatch(getListUsersError());
  }
};
