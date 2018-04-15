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
            companyName: Joi.string(),
            password: Joi.string().required(),
            email: Joi.string().email()
        })
    },
    company: {
        bodyCreate: Joi.object({
            companyName: Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i).required(),
            owner: Joi.objectId(),
            workers: Joi.array().items(Joi.objectId()),
            listOfTeams: Joi.array().items(Joi.objectId()),
            confirmed: Joi.boolean()
        }),
        teamCreate: Joi.object({
            teamName: Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i).required(),
            teamlead: Joi.objectId(),
            manager: Joi.objectId(),
            members: Joi.array().items(Joi.objectId()),
            listOfTasks: Joi.array().items(Joi.objectId()),
            description: Joi.string()
        }),
        bodyUpdate: Joi.object({
            companyNames: Joi.array().items(Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i))
        })

    },
    id: Joi.object({
        id: Joi.objectId().required()
    }),
    emailConfirm: {
        params: Joi.object({
            token: Joi.string().required()
        })
    },
    user: {
        query: Joi.object({
            sort: Joi.string().valid(['asc', 'desc']),
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
