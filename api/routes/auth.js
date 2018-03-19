let express = require('express');
let authController = require('../controllers/AuthController')
let router = express.Router();
const errObj = require('../utils/parseErrors')

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const options = { joi: { convert: true, allowUnknown: false } }



router.post('/signup',
    validate.body(schemas.signup.body,options),
    (req, res, next) => {
        let userCredentials = req.body;
        console.log(userCredentials)
        authController.createUser(userCredentials).then(user => {
            authController.sendConfirmationEmail(user)
            res.status(200).json({ status: 'ok' })
        }).catch(err => {
            next(errObj.createError('such mail exist', 400))
        })

    })
router.get('/confirmation/:token',
    authController.verifyUserConfirmation, (req, res) => {
        res.status(200).json({ 'status': 'ok' })
    })
router.post('/login',
    validate.body(schemas.auth.body, options),
    authController.createUserToken)
router.put('/reset_password', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
router.delete('/', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
module.exports = router;
