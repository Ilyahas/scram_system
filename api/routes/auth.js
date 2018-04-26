const express = require('express')
const authController = require('../controllers/AuthController')

const router = express.Router()
const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

router.post('/signup', validate.body(schemas.signup.body), authController.signupUser)
router.post(
  '/confirmation/:token',
  validate.params(schemas.emailConfirm.params),
  authController.verifyUserConfirmation,
)
router.post('/login', validate.body(schemas.auth.body), authController.createUserToken)

router.put('/reset_password', (req, res) => {
  res.status(405).json({ err: 'not implemeted yet' })
})
router.get(
  '/token/:token',
  validate.params(schemas.emailConfirm.params),
  authController.verifyToken,
)
router.delete('/logout', (req, res) => {
  res.status(405).json({ err: 'not implemeted yet' })
})

module.exports = router
