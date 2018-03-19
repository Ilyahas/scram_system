let User = require('../models/user')
let config = require('../../config/config')


class UserController {
    async list(req, res, next) {
        let totalCount, users, query = {}
        let sort = req.query.sort === 'desc' ? -1 : 1
        let search = req.query.search
        let sortBy = req.query.sortBy
        let page = req.query.page
        let perPage = req.query.page
        let isApproved = req.query.isApproved

        if (search) {
            query = [
                { nickname: new RegExp('^' + search) }
            ]
        }

        let listUserPromise = User.
            find(query).
            select('-salt -passwordHash -role -confirmationToken').
            skip(perPage * (page - 1)).
            limit(perPage);
        
        if(sortBy){
            let sortQuery= {}
            sortQuery[sortBy]=sort
            listUserPromise.sort(sortQuery)
        }

        let countUserPromise = User.find(query);

        try {
            let users = await listUserPromise;
            let totalCount = await countUserPromise;
            
            res.status(200).json({users,totalCount})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;