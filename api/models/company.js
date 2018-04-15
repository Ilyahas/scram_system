const mongoose = require('mongoose')

const Schema = mongoose.Schema



let Company = new Schema({
    companyName: {
        type: String,
        default: ''
        //unique:true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    workers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    listOfTeams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]


})


module.exports = mongoose.model('Company', Company);