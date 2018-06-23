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
  data: {
    manager: '5b05e4baea538b1272d8e484',
    members: ['5b05e468ea538b1272d8e481'],
    teamName: 'aqwert',
    teamlead: '5b05e468ea538b1272d8e481',
  },
  teamObj: {
    name: 'teamName',
    teamId: '',
  },
  setToken: userToken => {
    console.log(userToken)
    console.log('lol')
    token = userToken
  },
  getToken: () => {
    console.log(token)
    token
  },
}
