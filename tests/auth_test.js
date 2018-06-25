
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const User = require('../api/models/user')
const Companies = require('../api/models/company')
chai.use(chaiHttp)
chai.should()
const data = require('./dataForTests')
const server = require('../app')
describe('usert auth flow', () => {
  before(done => {
    mongoose.connection.db.dropDatabase()
    done()
  })
  describe('register user', () => {
    it('should register user', done => {
      chai
        .request(server)
        .post('/auth/signup')
        .send(data.userBody)
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
        .send(data.userBody)
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
        .send({ ...data.userBody, email: 'email' })
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
        .send(data.loginBody)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('requestStatus').eq(false)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have
            .property('error')
            .eq('Confirm Email')
          done()
        })
    })
  })
  describe('login user', () => {
    it('successfull login', async () => {
      await User.findOneAndUpdate(
        { email: data.userBody.email },
        { $set: { confirmed: true } },
      )
      chai
        .request(server)
        .post('/auth/login')
        .send(data.loginBody)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('requestStatus').eq(true)
          res.body.should.have.property('requestResult')
          res.body.requestResult.should.have.property('token')
        })
    })
  })
  describe('login user', () => {
    it('err where is no email', done => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ ...data.loginBody, email: '' })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
  describe('login user', () => {
    it('err where is no password', done => {
      chai
        .request(server)
        .post('/auth/login')
        .send({ ...data.loginBody, password: '' })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })
})
