let express = require('express');
let auth = require('../controllers/AuthController')
let router = express.Router();
let Company = require('../models/company')
let companyController = require('../controllers/company');
router.get('/',auth.verifyToken,auth.verifyAdmin, (req, res) => {
   companyController.getListOfUnverifiedCompanies()
})
router.post('/', (req, res) => {
    Company.create({companyName:req.body.company})
    .then(company=>{
        res.status(200).json(company)
    })
})
router.put('/', (req, res) => {
    res.status(405).json({ err: 'not implemeted yet' })
})
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