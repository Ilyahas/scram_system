import { createAction } from 'redux-act';
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
export const dashboardNewLane = data => ({
  type: dashboardActions.ADD_NEW_LANE,
  data,
})
export const createLane = () => ({
  type: dashboardActions.CREATE_LANE_SUCCESS,
})
export const createLaneFailed = () => ({
  type: dashboardActions.CREATE_LANE_FAILED,
})
export const createLaneStart = () => ({
  type: dashboardActions.CREATE_LANE_REQUEST,
})
const CREATE_CARD = 'CREATE_CARD_'
const SUCCESS = 'SUCCESS'
const REQUEST = 'REQUEST'
const FAILED = 'FAILED'
export const createCard = createAction(`${CREATE_CARD}${SUCCESS}`)
export const createCardRequest = createAction(`${CREATE_CARD}${REQUEST}`)
export const createCardFailed = createAction(`${CREATE_CARD}${FAILED}`)
const DELETE_CARD = 'DELETE_CARD_'
export const deleteCardAction = createAction(`${DELETE_CARD}${SUCCESS}`)
export const deleteCardRequest = createAction(`${DELETE_CARD}${REQUEST}`)
export const deleteCardFailed = createAction(`${DELETE_CARD}${FAILED}`)
const MOVE_CARD = 'MOVE_CARD_'
export const moveCardAction = createAction(`${MOVE_CARD}${SUCCESS}`)
export const moveCardRequest = createAction(`${MOVE_CARD}${REQUEST}`)
export const moveCardFailed = createAction(`${MOVE_CARD}${FAILED}`)

export const getDashboard = teamName => async (dispatch) => {
  try {
    dispatch(dashboardStart())
    const dashboardData = await api.dashboard.get(teamName)
    let data = dashboardData.data.requestResult
    data = data.map(element => ({ ...element, cards: element.cards.map(item => ({ ...item, id: item._id })) }))
    dispatch(dashboard(data))
  } catch (error) {
    dispatch(dashboardFailed())
  }
}
export const lane = (teamName, laneTitle) => async (dispatch) => {
  try {
    dispatch(createLaneStart())
    const createdLane = await api.dashboard.createLane(teamName, laneTitle)
    const data = createdLane.data.requestResult
    dispatch(createLane())
    dispatch(dashboardNewLane({ ...data, id: data._id, cards: [] }))
  } catch (error) {
    dispatch(createLaneFailed())
  }
}
export const card = (laneId, body) => async (dispatch) => {
  try {
    dispatch(createCardRequest())
    const cardData = body
    cardData.customId = cardData.id
    delete cardData.id
    await api.dashboard.addCard(laneId, cardData)
    dispatch(createCard())
  } catch (error) {
    dispatch(createCardFailed())
  }
}
export const deleteCard = cardId => async (dispatch) => {
  try {
    dispatch(deleteCardRequest())
    await api.dashboard.deleteCard(cardId)
    dispatch(deleteCardAction())
  } catch (error) {
    dispatch(deleteCardFailed())
  }
}
export const moveCard = (laneId, bodyUpdate) => async (dispatch) => {
  try {
    dispatch(moveCardRequest())
    await api.dashboard.moveCard(laneId, bodyUpdate)
    dispatch(moveCardAction())
  } catch (error) {
    dispatch(moveCardFailed())
  }
}
