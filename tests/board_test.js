process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const Dashboard = require('../api/models/dashboard')
chai.use(chaiHttp)
chai.should()
const config = require('./configForTests')
const server = require('../app')

const teamObj = {
  name: 'teamName',
  teamId: '',
}

describe('board operations for specific team', () => {
  describe('/get specific dashboard for specific team', () => {
    it('successfully get', async () => {
      
    })
  })
})
