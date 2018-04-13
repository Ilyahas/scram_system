let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let config = require('../../config/config')
let Token = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userAgent: {
        type: String,
        required: true
    },
    userIp: {
        type: String,
        required: true
    },
    tokenHash: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports= mongoose.model('Token',Token);
