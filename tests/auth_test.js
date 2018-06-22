process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const User = require('../api/models/user')
const Companies = require('../api/models/company')
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
const loginBody = {
  email: 'yurako97@gmail.com',
  password: '123',
}
describe('usert auth flow', () => {
  before(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
  after(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
  describe('register user', () => {
    it('should register user', done => {
      chai
        .request(server)
        .post('/auth/signup')
        .send(userBody)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          done()
        })
    })
  })
  describe('register user', () => {
    it('should throught error because of duplicate email', done => {
      chai
        .request(server)
        .post('/auth/signup')
        .send(userBody)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('requestStatus').eq(false)
          done()
        })
    })
  })
  describe('register user', () => {
    it('should throught error because of invalid email', done => {
      chai
        .request(server)
        .post('/auth/signup')
        .send({ ...userBody, email: 'email' })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('login user', () => {
    it('can`t login because email not verified', done => {
      chai
        .request(server)
        .post('/auth/login')
        .send(loginBody)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('requestStatus').eq(false)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('error').eq('Confirm Email')
          done()
        })
    })
  })
  
})
