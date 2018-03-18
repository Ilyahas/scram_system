let express = require('express');
let authController = require('../controllers/AuthController')
let router = express.Router();
let errObj = require('../utils/parseErrors')
router.post('/signup', (req, res,next) => {
    let userCredentials = req.body;
    console.log(userCredentials)
    authController.createUser(userCredentials).then(user => {
        authController.sendConfirmationEmail(user)
        res.status(200).json({ status: 'ok' })
    }).catch(err => {
        console.log(err)
        next(errObj.createError('such mail exist', 409))
    })
    
})
router.get('/confirmation/:token',authController.verifyUserConfirmation,(req,res)=>{
    res.status(200).json({'status':'ok'})
})
router.post('/login', authController.createUserToken)
router.put('/reset_password', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
router.delete('/', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
module.exports = router;
