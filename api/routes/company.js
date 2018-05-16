const express = require('express')
const auth = require('../controllers/authController')

const router = express.Router()
const CompanyController = require('../controllers/companyController')
const LaneController = require('../controllers/laneController')
const validate = require('express-joi-validation')({})
const schemas = require('../joi/schema')

const CmpCtrl = new CompanyController()
const LaneCtrl = new LaneController()

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
  '/team/:name/lane',
  validate.params(schemas.dashboard.params),
  validate.body(schemas.dashboard.bodyCreate),
  LaneCtrl.create,
)
router.post(
  '/boards',
  validate.body(schemas.dashboard.dashboardCreate),
  LaneCtrl.createDashboard,
)
router.get(
  '/team/:name/dashboard/:idBoard',
  validate.params(schemas.dashboard.params),
  LaneCtrl.get,
)
router.get('/dashboards/:id', LaneCtrl.getDashboard)
router.put(
  '/lane/:id',
  validate.body(schemas.dashboard.laneUpdate),
  LaneCtrl.update,
)
router.delete('/:id/team/:name/lane/:laneId', LaneCtrl.delete)
router.post(
  '/lane/:id/card',
  validate.params(schemas.id),
  validate.body(schemas.card.cardCreate),
  LaneCtrl.addCard,
)
router.put(
  '/card/:cardId',
  validate.params(schemas.card.cardUpdate.cardId),
  validate.body(schemas.card.cardCreate),
  LaneCtrl.updateCard,
)
router.delete('/card/:cardId', LaneCtrl.deleteCard)

module.exports = router
