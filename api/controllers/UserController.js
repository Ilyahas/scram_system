let User = require('../models/user')
let config = require('../../config/config')
const BaseController = require('./BaseController');
class UserController extends BaseController {
    async list(req, res, next) {
        let totalCount, users, query = {}
        let sort = req.query.sort === 'desc' ? -1 : 1
        let search = req.query.search
        let sortBy = req.query.sortBy
        let page = req.query.page
        let perPage = req.query.perPage || 10
        let isApproved = req.query.isApproved

        if (search) {
            query.email = new RegExp('^' + search)
        }

        let listUserPromise = User.
            find(query).
            select('email')
        if (sortBy) {
            let sortQuery = {}
            sortQuery[sortBy] = sort
            listUserPromise.sort(sortQuery)
        }

        let countUserPromise = User.find(query).count();

        try {
            let users = await listUserPromise;
            let totalCount = await countUserPromise;
            super.responseJSON(res,200,true,{ users, totalCount })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;