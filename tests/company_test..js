process.env.NODE_ENV = 'test'
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const config = require('./configForTests')
chai.use(chaiHttp)
chai.should()
const testData = require('./')
const server = require('../app')
describe('company operations', () => {
   after(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
  describe('/POST create team', () => {
    it('it should create specific team for user company',  async () => {
      await testData.initData()
      chai
        .request(server)
        .post(`/company/${testData.getCompanyId()}/team`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(testData.teamBody)
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
          .post(`/company/${testData.getCompanyId()}/team`)
          .send(testData.teamBody)
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
          .post(`/company/${testData.getCompanyId()}/team`)
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send({ ...testData.teamBody, manager: 'lol' })
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
          .post(`/company/${testData.getCompanyId()}/team`)
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send({ ...testData.teamBody, teamlead: 'lol' })
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
          .post(`/company/${testData.getCompanyId()}/team`)
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send({ ...testData.teamBody, teamlead: 'lol' })
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
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send(testData.teamBody)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/get get list of all company teams', () => {
      it('get all teams',  (done) => {
        chai
          .request(server)
          .get('/company')
          .set('Authorization', 'Bearer ' + testData.getToken())
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('requestStatus').eq(true)
            res.body.should.have.property('requestResult')
            res.body.requestResult.should.have
              .property('listOfTeams')
              .be.an('array')
              done()
          })
      })
    })

    describe('/POST create new dashboard for specific team', () => {
      it('should create new dashboard',  (done) => {
        const teamObj = {
          name: testData.teamName,
          teamId: testData.getTeamId(),
        }
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send(teamObj)
          .end((err, res) => {
            res.body.should.have.property('requestStatus').eq(true)
            res.body.should.have.property('requestResult')
            res.body.requestResult.should.have.property('name')
            res.body.requestResult.should.have.property('_id')
            res.body.requestResult.should.have.property('teamId')
            done()
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      it('failed because where are no post body', (done) => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + testData.getToken())
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      const team = { ...testData.teamObj }
      delete team.name
      it('failed because where are no name', done => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send(team)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
    describe('/POST create new dashboard for specific team', () => {
      const team = { ...testData.teamObj }
      delete team.teamId
      it('failed because where are no teamId', done => {
        chai
          .request(server)
          .post('/company/boards')
          .set('Authorization', 'Bearer ' + testData.getToken())
          .send(team)
          .end((err, res) => {
            res.should.have.status(400)
            done()
          })
      })
    })
  })
})
