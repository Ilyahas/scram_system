let express = require('express');
let authController = require('../controllers/AuthController')
let router = express.Router();
const errObj = require('../utils/parseErrors')

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const options = { joi: { convert: true, allowUnknown: false } }



router.post('/signup',
    validate.body(schemas.signup.body, options),
    authController.signupUser
)
router.get('/confirmation/:token',
    authController.verifyUserConfirmation
)

router.post('/login',
    validate.body(schemas.auth.body, options),
    authController.createUserToken)

router.put('/reset_password', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})

router.delete('/logout', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})

module.exports = router;
