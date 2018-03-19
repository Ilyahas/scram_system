let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let User = new Schema({
    nickname:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    salt:{
        type:String,
        required:true
    },
    passwordHash: {
        type: String,
        required:true
    },
    confirmationToken:{
        type:String,
        default:''
    },
    confirmed: {
        type: Boolean,
        default:false
    },
    role:{
        type:String,
        default:'0'
    }
})



User.methods.setConfirmationToken = ()=>{
    this.confirmationToken = this.generateJWT;
}

module.exports = mongoose.model('User', User);