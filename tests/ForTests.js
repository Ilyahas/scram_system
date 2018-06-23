const User = require('../api/models/user')
const Token = require('../api/models/token')
const Team = require('../api/models/team')
let token = ''
let userId = ''
let companyId = ''
let teamId = ''
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
  initTeamForBoards: async () => {
    const team = await Team.findOne({ teamName: this.teamName })
    teamId = team._id
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
}
