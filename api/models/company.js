const mongoose = require('mongoose')

const Schema = mongoose.Schema



let Company = new Schema({
    companyName:{
        type:String,
        default:''
        //unique:true,
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
    }],   
    confirmed: {
        type: Boolean,
        default:false
    },  
    listOfTeams:{
        type:Schema.Types.ObjectId,
        ref:'Team'
    }  
    
    
})


module.exports = mongoose.model('Company',Company);