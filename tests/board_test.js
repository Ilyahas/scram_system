process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const Dashboard = require('../api/models/dashboard')
chai.use(chaiHttp)
chai.should()
const testData = require('./configForTests')
const server = require('../app')

const teamObj = {
  name: 'teamName',
  teamId: '',
}

describe('board operations for specific team', async () => {
  describe('/get specific dashboard for specific team', () => {
    it('successfully get', async () => {
      console.log('HERE123')
      const toke = testData.getToken()
      console.log(toke)
    })
  })
})
