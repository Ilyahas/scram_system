import axios from 'axios'
import header from '../utils/config'

// const host = 'https://shrouded-anchorage-48030.herokuapp.com'
const host = 'http://localhost:3030'
export default {
  user: {
    login: data => axios.post(`${host}/auth/login`, { ...data }),
    signup: credentials => axios.post(`${host}/auth/signup`, { ...credentials }),
    confirmEmail: token => axios.post(`${host}/auth/confirmation/${token}`),
    list: input => axios.get(`${host}/user?search=${input}`, header()).then(response => response.data.requestResult.users),
    tokenExp: token => axios.get(`${host}/auth/token/${token}`, header()),
  },
  company: {
    get: () => axios.get(`${host}/company`, header()),
    createTeam: (id, data) => {
      axios.post(`${host}/company/${id}/team`, { ...data }, header())
    },
  },
  dashboard: {
    createLane: (teamName, body) => axios.post(`${host}/company/team/${teamName}/lane`, body, header()),
    get: teamName => axios.get(`${host}/company/team/${teamName}/dashboard`, header()),
    deleteLane: (companyId, teamName, laneId) => axios.delete(`${host}/company/${companyId}/team/${teamName}/lane/${laneId}`),
    moveCard: (laneId, body) => axios.put(`${host}/company/lane/${laneId}`, { ...body }, header()),
    addCard: (laneId, body) => axios.post(`${host}/company/lane/${laneId}/card`, { ...body }, header()),
    updateCard: (cardId, body) => axios.put(`${host}/company/card/${cardId}`, { ...body }, header()),
    deleteCard: (cardId, body) => axios.delete(`${host}/company/card/${cardId}`, { ...body }, header()),
  },
}
