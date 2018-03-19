const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    auth: {
        body:Joi.object({
            password:Joi.string().required(),
            email:Joi.string().email().required()
        })
    },
    signup:{
        body:Joi.object({
            nickname:Joi.string().required(),
            password:Joi.string().required(),
            email:Joi.string().email().required()
        })
    },
    company: {
        bodyCreate: Joi.object({
            companyName: Joi.string().regex(/[a-zA-Zа-яА-Я\d\-_\s]+/i).required(),
            owner: Joi.objectId(),
            teamlead: Joi.objectId(),
            workers: Joi.array().items(Joi.objectId()),
            confirmed: Joi.boolean()
        })
    },
 

}