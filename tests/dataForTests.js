const User = require('../api/models/user')
const Token = require('../api/models/token')
const Team = require('../api/models/team')
const Dashboard = require('../api/models/dashboard')

let token = ''
let userId = ''
let companyId = ''
let teamId = ''
let dashboardId = ''
module.exports = {
  userBody: {
    companyName: 'testCompany',
    password: '123',
    email: 'yurako97@gmail.com',
    nickname: 'qwerty',
    firstname: 'lol',
    lastname: 'kek',
  },
  loginBody: {
    email: 'yurako97@gmail.com',
    password: '123',
  },
  userBody: {
    companyName: 'testCompany',
    password: '123',
    email: 'yurako97@gmail.com',
    nickname: 'qwerty',
    firstname: 'lol',
    lastname: 'kek',
  },
  teamBody: {
    manager: '5b05e4baea538b1272d8e484',
    members: ['5b05e468ea538b1272d8e481'],
    teamName: 'teamName',
    teamlead: '5b05e468ea538b1272d8e481',
  },
  teamName: 'teamName',
  teamObj: {
    name: 'teamName',
    teamId,
  },
  initDashboardForKanes: async () => {
    const newTeam = await Team.create({
      manager: '5b05e4baea538b1272d8e484',
      members: ['5b05e468ea538b1272d8e481'],
      teamName: 'teamName',
      teamlead: '5b05e468ea538b1272d8e481',
      companyId: companyId
    })
    const dashboard = await Dashboard.create({
      name: 'lol',
      teamId: newTeam._id,
    })
    const teams = await Team.findOneAndUpdate(
      { teamName: 'teamName' },
      {
        $push: { dashboards: dashboard.id },
      },
      { upset: true },
    )
    dashboardId = dashboard._id
    teamId = teams.id
    return dashboardId
  },
  initTeamForBoards: async () => {
    const team = await Team.findOne({ teamName: 'teamName' })
    teamId = team._id
    return teamId
  },
  initData: async function() {
    try {
      const user = await User.findOne({ email: this.userBody.email })
      const dbToken = await Token.findOne({ userId: user._id })
      token = dbToken.tokenHash
      userId = user._id
      companyId = user.company
    } catch (err) {
      throw new Error(err)
    }
  },
  getToken: () => {
    return token
  },
  getTeamId: () => {
    return teamId
  },
  getUserId: () => {
    return userId
  },
  getCompanyId: () => {
    return companyId
  },
  getDashboardId: () => {
    return dashboardId
  },
}
