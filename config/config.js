module.exports = {
  apiName: 'scumDesk',
  apiKey: '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',
  host: 'https://shrouded-anchorage-48030.herokuapp.com',
  testMongo:'mongodb://127.0.0.1:27017/trelloTestBb',
  mongoUrl: 'mongodb://superhotty:123@ds113849.mlab.com:13849/trellodb',
  secretKey: '1qw23r4r-1qwqwqqw-1223weweqw-weqwqe',
  userPrivilages: {
    user: '0',
    projectManager: '1',
    teamlead: '2',
    owner: '3',
    admin: '4',
  },
  expireTime: '86400',
  mailer: {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '9d6dc8be066b0d',
      pass: 'f2690e633a3e03',
    },
  },
  from: '"ScrumDesk" <scrumdesk@stia.com>',
}
