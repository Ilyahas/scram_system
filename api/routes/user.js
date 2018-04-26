const express = require('express')

const router = express.Router()

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const AuthCtrl = require('../controllers/AuthController')

const UserController = require('../controllers/UserController')

const UsrCtrl = new UserController()

router.get('/', AuthCtrl.verifyToken, validate.query(schemas.user.query), UsrCtrl.list)

router.post('/', (req, res) => {
  res.status(405).json({ err: 'not implemeted yet' })
})
router.put('/', (req, res) => {
  res.status(405).json({ err: 'not implemeted yet' })
})
router.delete('/', (req, res) => {
  res.status(405).json({ err: 'not implemeted yet' })
})

module.exports = router
