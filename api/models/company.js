let mongoose = require('mongoose')

let Schema = mongoose.Schema
//TODO: pre save validator for uniqui field
let Company = new Schema({
    companyName:{
        type:String,
        unique:true,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    teamlead:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    workers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
})


module.exports = mongoose.model('Company',Company);