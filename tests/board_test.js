
const dashboard = require('../api/models/dashboard')
const teams = require('../api/models/team')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
chai.should()
const testData = require('./dataForTests')
const server = require('../app')

const teamObj = {
  name: 'teamName',
  teamId: '',
}

describe('board operations for specific team', () => {
  after(async () => {
    await dashboard.remove({})
    await teams.remove({})
  })
  describe('/get specific dashboard for specific team', () => {
    it('successfully get', async () => {
      await testData.initData()
      const boardId = await testData.initDashboardForKanes()
      chai
        .request(server)
        .get(`/company/team/teamName/dashboard/${boardId}`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          res.body.should.have.property('requestResult').be.an('array')
        })
    })
  })
  describe('/get specific dashboard for specific team', () => {
    it('failed get team not valid mongoose id', done => {
      chai
        .request(server)
        .get(`/company/team/teamName/dashboard/123]}`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/get dashboard participans', () => {
    it('get participoans', done => {
      chai
        .request(server)
        .get(`/company/dashboard/${testData.teamName}`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('members').be.an('array')
          res.body.requestResult.should.have
            .property('dashboards')
            .be.an('array')
          done()
        })
    })
  })
  describe('/get dashboard participans', () => {
    it('failed no such team', done => {
      chai
        .request(server)
        .get(`/company/dashboard/123`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('requestStatus').eq(false)
          done()
        })
    })
  })
  describe('/post dashboard create lane', () => {
    it('lane created', done => {
      const laneCreate = {
        idBoard: testData.getDashboardId(),
        title: '123',
      }
      chai
        .request(server)
        .post(`/company/team/${testData.teamName}/lane`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(laneCreate)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('idBoard')
          res.body.requestResult.should.have.property('title')
          res.body.requestResult.should.have.property('teamName')
          testData.setLaneId(res.body.requestResult._id)
          done()
        })
    })
  })
  describe('/post create lane', () => {
    it('failed idBoard Required', done => {
      const laneCreate = {
        title: '123',
      }
      chai
        .request(server)
        .post(`/company/team/${testData.teamName}/lane`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(laneCreate)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/post create lane', () => {
    it('failed title required', done => {
      const laneCreate = {
        idBoard: testData.getDashboardId(),
      }
      chai
        .request(server)
        .post(`/company/team/${testData.teamName}/lane`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(laneCreate)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/post create lane', () => {
    it('failed title bearer token required', done => {
      const laneCreate = {}
      chai
        .request(server)
        .post(`/company/team/${testData.teamName}/lane`)
        .send(laneCreate)
        .end((err, res) => {
          res.should.have.status(403)
          res.body.should.have.property('requestStatus').eq(false)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('error')
          done()
        })
    })
  })
  describe('/post create card', () => {
    it('create card for lane', done => {
      const cardCreate = {
        customId: '40410b20-77c4-11e8-8412-1f13a18372b2',
        description: 'as',
        label: 'as',
        title: 'as',
      }
      chai
        .request(server)
        .post(`/company/lane/${testData.getLaneId()}/card`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(cardCreate)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('_id')
          res.body.requestResult.should.have.property('title')
          res.body.requestResult.should.have.property('label')
          done()
        })
    })
  })
  describe('/post create card', () => {
    it('create card for lane failed no customId', done => {
      const cardCreate = {
        description: 'as',
        label: 'as',
        title: 'as',
      }
      chai
        .request(server)
        .post(`/company/lane/${testData.getLaneId()}/card`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(cardCreate)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/post create card', () => {
    it('create card for lane failed label is num', done => {
      const cardCreate = {
        customId: '40410b20-77c4-11e8-8412-1f13a18372b2',
        description: 'as',
        label: 123,
        title: 'as',
      }
      chai
        .request(server)
        .post(`/company/lane/${testData.getLaneId()}/card`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(cardCreate)
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('/post create card', () => {
    it('create card for lane failed duplicated custom id', done => {
      const cardCreate = {
        customId: '40410b20-77c4-11e8-8412-1f13a18372b2',
        description: 'as',
        label: 'as',
        title: 'as',
      }
      chai
        .request(server)
        .post(`/company/lane/${testData.getLaneId()}/card`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .send(cardCreate)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('requestStatus').eq(false)
          done()
        })
    })
  })
})
