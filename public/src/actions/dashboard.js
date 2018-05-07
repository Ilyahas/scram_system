import { dashboardActions } from '../utils/types'
import api from '../utils/api'

export const dashboard = data => ({
  type: dashboardActions.GET_BOARD_SUCCESS,
  data,
})
export const dashboardFailed = () => ({
  type: dashboardActions.GET_BOARD_FAILED,
})
export const dashboardStart = () => ({
  type: dashboardActions.GET_BOARD_REQUEST,
})

export const getDashboard = teamName => async (dispatch) => {
  try {
    dispatch(dashboardStart())
    const dashboardData = await api.dashboard.get(teamName)
    const data = dashboardData.data.requestResult
    data.map((element) => {
      const newElem = element
      newElem.cards.map((item) => {
        const newItem = item
        newItem.id = item._id
        return newItem
      })
      return newElem
    });
    dispatch(dashboard(data))
  } catch (error) {
    dispatch(dashboardFailed())
  }
}
