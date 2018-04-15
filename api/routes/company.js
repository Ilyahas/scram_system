const express = require('express');
const auth = require('../controllers/AuthController')
const router = express.Router();
const Company = require('../models/company')
const companyController = require('../controllers/CompanyController')

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const CmpCtrl = new companyController();

router.get('/',
    auth.verifyToken,
    CmpCtrl.getCompany
)

router.get('/:userId',
    auth.verifyToken,
)
router.put('/approve',
    auth.verifyToken,
    auth.verifyAdmin,
    validate.body(schemas.company.bodyUpdate),
    CmpCtrl.approveCompanies)
router.post('/',
    auth.verifyToken,
    validate.body(schemas.company.bodyCreate),
    CmpCtrl.createCompany)
router.post('/:id/team',
    auth.verifyToken,
    validate.params(schemas.id),
    validate.body(schemas.company.teamCreate),
    CmpCtrl.createTeam)


router.delete('/', (req, res) => {
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