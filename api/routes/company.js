const express = require('express');
const auth = require('../controllers/AuthController')
const router = express.Router();
const Company = require('../models/company')
const companyController = require('../controllers/company')

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const options = { joi: { convert: true, allowUnknown: false } }

const CmpCtrl = new companyController();

router.get('/',
    auth.verifyToken,
    auth.verifyAdmin,
    CmpCtrl.getListOfUnverifiedCompanies.bind(CmpCtrl))



router.post('/',
    auth.verifyToken,
    validate.body(schemas.company.bodyCreate, options),
    CmpCtrl.createCompany)

router.put('/',
    auth.verifyToken,
    auth.verifyAdmin,
    validate.body(schemas.company.bodyUpdate),
    CmpCtrl.updateCompany)

    
router.delete('/', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})

router.get('/:id', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
router.post('/:id', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
router.put('/:id', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
router.delete('/:id', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})




module.exports = router;