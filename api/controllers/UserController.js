const User = require('../models/user')

const BaseController = require('./BaseController')

class UserController extends BaseController {
  async list(req, res, next) {
    const query = {}
    const sort = req.query.sort === 'desc' ? -1 : 1
    const { search } = req.query
    const { sortBy } = req.query
    // let page = req.query.page
    // let perPage = req.query.perPage || 10
    // let isApproved = req.query.isApproved

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
