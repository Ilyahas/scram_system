const User = require('../models/user')

const BaseController = require('./baseController')

class UserController extends BaseController {
  async list(req, res, next) {
    const query = {}
    const sort = req.query.sort === 'desc' ? -1 : 1
    const { search } = req.query
    const { sortBy } = req.query
    // const page = req.query.page
    // const perPage = req.query.perPage || 10
    // const isApproved = req.query.isApproved

    if (search) {
      query.email = new RegExp(`^${search}`)
    }

    const listUserPromise = User.find(query).select('email')
    if (sortBy) {
      const sortQuery = {}
      sortQuery[sortBy] = sort
      listUserPromise.sort(sortQuery)
    }

    const countUserPromise = User.find(query).count()

    try {
      const users = await listUserPromise
      const totalCount = await countUserPromise
      super.responseJSON(res, 200, true, { users, totalCount })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController
