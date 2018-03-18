let mongoose = require('mongoose')

let Shema = mongoose.Schema;

let Task = new Schema({
    assignedUser:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    taskDeckription:{
        type:String
    },
    time:{
        type:Date
    },
    approved:{
        type:Boolean,
        default:false
    },
    comments:[{
        type:Shema.Types.ObjectId,
        ref:'Comments'
    }]
})

module.exports = mongoose.model('Task',Task)