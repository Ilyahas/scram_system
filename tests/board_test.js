process.env.NODE_ENV = 'test'
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
  describe('/get specific dashboard for specific team',  () => {
    it('successfully get', async () => {
      await testData.initData()
      const boardId = await testData.initDashboardForKanes()
      chai
        .request(server)
        .get(`/company/dashboard/${boardId}`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          console.log(res)
          res.should.have.status(200)
        })
    })
  })
  describe('/get specific dashboard for specific team',  () => {
    it('failed get team not vali mongoose id',  (done) => {
      chai
        .request(server)
        .get(`/company/dashboard/123`)
        .set('Authorization', 'Bearer ' + testData.getToken())
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
})
