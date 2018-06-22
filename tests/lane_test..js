// process.env.NODE_ENV = 'test'

// const chai = require('chai')
// const chaiHttp = require('chai-http')

// chai.use(chaiHttp)
// chai.should()
// const server = require('../app')

// describe('lane operations', () => {
//   beforeEach(async done => {
//     try {
//       Lane.remove({})
//     } catch (error) {
//       console.log(error)
//     }
//     done()
//   })
//   describe('/POST create team', () => {
//     it('it should create specific team for user company', done => {
//       const data = {
//         manager: '5b05e4baea538b1272d8e484',
//         members: ['5b05e468ea538b1272d8e481'],
//         teamName: 'aqwert',
//         teamlead: '5b05e468ea538b1272d8e481',
//       }
//       const companyId = '5b0520a54491a303bc924db2'
//       chai
//         .request(server)
//         .post(`/company/${companyId}/team`)
//         .send(data)
//         .end((err, res) => {
//           res.should.have.status(201)
//           res.body.should.be.a('object')
//           res.body.should.have.property('requestStatus').eql(true)
//           res.body.should.have.property('requestResult')
//           res.body.requestResult.should.have.property('companyId')
//           res.body.requestResult.should.have.property('manager')
//           res.body.requestResult.should.have
//             .property('members')
//             .should.be.a('array')
//           done()
//         })
//     })
//   })
//   //   describe('/POST create lane', () => {
//   //     chai.request(server).post
//   //   })
// })
