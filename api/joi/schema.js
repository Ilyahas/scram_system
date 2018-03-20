const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    auth: {
        body: Joi.object({
            password: Joi.string().required(),
            email: Joi.string().email().required()
        })
    },
    signup: {
        body: Joi.object({
            nickname: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().email().required()
        })
    },
    company: {
        bodyCreate: Joi.object({
            companyName: Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i).required(),
            owner: Joi.objectId(),
            teamlead: Joi.objectId(),
            workers: Joi.array().items(Joi.objectId()),
            confirmed: Joi.boolean()
        }),
        bodyUpdate:Joi.object({
            companyNames:Joi.array().items(Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i))
        })

    },
    user: {
        query: Joi.object({
            sort:Joi.string().valid(['asc','desc']),
            search: Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i),
            sortBy: Joi.string().valid(['email',
                'nickname']),
            page: Joi.number().integer().positive(),
            perPage: Joi.number().integer().positive(),
            isApproved: Joi.number().integer().valid([0, 1])
        })
    },
    resetPassword: {
        params: Joi.object({
            email: Joi.string().email().required()
        })
    }


}
