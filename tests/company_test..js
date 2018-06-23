process.env.NODE_ENV = 'test'
const User = require('../api/models/user')
const Token = require('../api/models/token')
const Team = require('../api/models/team')
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const config = require('./configForTests')
chai.use(chaiHttp)
chai.should()
const server = require('../app')
const userBody = {
  companyName: 'testCompany',
  password: '123',
  email: 'yurako97@gmail.com',
  nickname: 'qwerty',
  firstname: 'lol',
  lastname: 'kek',
}
const data = {
  manager: '5b05e4baea538b1272d8e484',
  members: ['5b05e468ea538b1272d8e481'],
  teamName: 'aqwert',
  teamlead: '5b05e468ea538b1272d8e481',
}
const teamObj = {
  name: 'teamName',
  teamId: '',
}
let token = ''
let userId = ''
let companyId = ''
let teamId = ''
describe('company operations', () => {
  // after(done => {
  //   mongoose.connection.db.dropDatabase()
  //   done()
  // })
  describe('/POST create team', () => {
    it('it should create specific team for user company', async () => {
      const user = await User.findOne({ email: userBody.email })
      const dbToken = await Token.findOne({ userId: user._id })
      config.setToken(dbToken.tokenHash)
      token = dbToken.tokenHash
      userId = user._id
      companyId = user.company
      chai
        .request(server)
        .post(`/company/${companyId}/team`)
        .set('Authorization', 'Bearer ' + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('requestStatus').eql(true)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('companyId')
          res.body.requestResult.should.have.property('manager')
          res.body.requestResult.should.have.property('members')
        })
    })
    describe('/POST create team', () => {
      it('it should throught error because where are no bearer token', done => {
        chai
          .request(server)
          .post(`/company/${companyId}/team`)
          .send(data)
          .end((err, res) => {
            res.should.have.status(403)
            done()
          })
      })
    })
    describe('/POST create team', () => {
      it('it should throught error because manager is not valid mongoose id', done => {
        chai
          .request(server)
          .post(`/company/${companyId}/team`)
          .set('Authorization', 'Bearer ' + token)
          .send({ ...data, manager: 'lol' })
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create team', () => {
      it('it should throught error because teamlead is not valid mongoose id', done => {
        chai
          .request(server)
          .post(`/company/${companyId}/team`)
          .set('Authorization', 'Bearer ' + token)
          .send({ ...data, teamlead: 'lol' })
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create team', () => {
      it('it should throught error where are no team name', done => {
        chai
          .request(server)
          .post(`/company/${companyId}/team`)
          .set('Authorization', 'Bearer ' + token)
          .send({ ...data, teamlead: 'lol' })
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create team', () => {
      it('it should throught error where are no companyId in url params', done => {
        chai
          .request(server)
          .post(`/company/123/team`)
          .set('Authorization', 'Bearer ' + token)
          .send(data)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/get get list of all company teams', () => {
      it('get all teams', async () => {
        chai
          .request(server)
          .get('/company')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('requestStatus').eq(true)
            res.body.should.have.property('requestResult')
            res.body.requestResult.should.have
              .property('listOfTeams')
              .be.an('array')
          })
      })
    })

    describe('/POST create new dashboard for specific team', () => {
      it('should create new dashboard', async () => {
        const team = await Team.findOne({ teamName: data.teamName })
        teamObj.teamId = team._id
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + token)
          .send(teamObj)
          .end((err, res) => {
            res.body.should.have.property('requestStatus').eq(true)
            res.body.should.have.property('requestResult')
            res.body.requestResult.should.have.property('name')
            res.body.requestResult.should.have.property('_id')
            res.body.requestResult.should.have.property('teamId')
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      it('failed because where are no post body', done => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      const team = { ...teamObj }
      delete team.name
      it('failed because where are no name', done => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + token)
          .send(team)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      const team = { ...teamObj }
      delete team.teamId
      it('failed because where are no teamId', done => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + token)
          .send(team)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
  })
})
