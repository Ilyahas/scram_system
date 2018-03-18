

let mongoose = require('mongoose')

let Schema = mongoose.Schema;

let Team = new Schema({
    teamName: {
        type: String,
        required: true
    },
    teamlead: {
        type: Shema.Types.ObjecdId,
        ref: 'User'
    },
    members:[{
        type:Shema.Types.ObjectId,
        ref:'User'
    }],
    listOfTasks:[{
        type:Shema.Types.ObjectId,
        ref:'Task'
    }],
    description:{
        type:String,
        default:''
    }


})
module.exports =  mongoose.model('Team', Team)
