let express = require('express');
let router = express.Router();

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

let AuthCtrl = require('../controllers/AuthController')

let userController = require('../controllers/UserController')
let UsrCtrl = new userController();



router.get('/',
AuthCtrl.verifyToken,
validate.body(schemas.user.query),
userController.list)





router.post('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})
router.put('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})
router.delete('/',(req,res)=>{
    res.status(405).json({err:'not implemeted yet'})
})



module.exports = router;