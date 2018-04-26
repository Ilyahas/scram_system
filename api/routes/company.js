const express = require('express')
const auth = require('../controllers/AuthController')

const router = express.Router()
const CompanyController = require('../controllers/CompanyController')

const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const CmpCtrl = new CompanyController()

router.get('/', auth.verifyToken, CmpCtrl.getCompany)

router.get('/:userId', auth.verifyToken)
router.put(
  '/approve',
  auth.verifyToken,
  auth.verifyAdmin,
  validate.body(schemas.company.bodyUpdate),
  CmpCtrl.approveCompanies,
)
router.post(
  '/',
  auth.verifyToken,
  validate.body(schemas.company.bodyCreate),
  CmpCtrl.createCompany,
)
router.post(
  '/:id/team',
  auth.verifyToken,
  validate.params(schemas.id),
  validate.body(schemas.company.teamCreate),
  CmpCtrl.createTeam,
)
router.post(
  '/:id/team/:name/lane',
  validate.params(schemas.dashboard.params),
  validate.body(schemas.dashboard.bodyCreate),
  CmpCtrl.createLane,
)
router.delete('/:id/team/:name/lane/:laneId', CmpCtrl.deleteLane)
router.post(
  '/lane/:id/card',
  validate.params(schemas.id),
  validate.body(schemas.card),
  CmpCtrl.addCard,
)
router.put(
  '/lane/:id/card/:cardId',
  validate.params(schemas.card.cardUpdate.cardId),
  validate.body(schemas.card.cardCreate),
  CmpCtrl.updateCard,
)

module.exports = router
