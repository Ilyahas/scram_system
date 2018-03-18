let crypto = require('crypto');
let jwt = require('jsonwebtoken');


let User = require('../models/user')
let Token = require('../models/token')
let config = require('../../config/config')
let errObj = require('../utils/parseErrors')
let emailSender = require('../utils/sendgrid')

let algorithm = 'sha512';
let stringLenght = 16;
let generateRandomString = (lenght) => {
    return crypto.randomBytes(Math.ceil(lenght / 2))
        .toString('hex')
        .slice(0, lenght)
}
let hashPasswordSha512 = (password, salt) => {
    let hash = crypto.createHmac(algorithm, salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
}
let saltHashPassword = (userPassword) => {
    let salt = generateRandomString(stringLenght);
    return hashPasswordSha512(userPassword, salt);
}
let generateJWT = (email) => {
    return jwt.sign(
        {
            email: email
        },
        config.secretKey
    )
}
//conf token for use model
let getCongirmationToken = (email) => {
    return generateJWT(email);
}
function createUser(data) {
    let hashedPassword = saltHashPassword(data.password);
    let confirmationToken = getCongirmationToken(data.email)
    return User.create({
        email: data.email,
        salt: hashedPassword.salt,
        passwordHash: hashedPassword.passwordHash,
        confirmationToken: confirmationToken
    })
}


//TODO: send html form
function sendConfirmationEmail(user) {
    emailSender.sendConfirmationEmail(user).catch(err=>{
        next(errObj.createError('can`t send mail',400));
    })
}
function verifyUserConfirmation(req, res, next) {
    let token = req.params.token;
    console.log(token);
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: '', confirmed: true },
        { new: true }
    ).then(user => {
        req.body.user = user
        next();
        ///
    }).catch(err => {
        let error = new Error('no such user with token');
        error.statusCode = 550;
        next(user);
    })
}
function createUserToken(req, res, next) {
    let { email, password } = req.body;
    User.findOne({ email: email }).then(user => {
        let salt = user.salt;
        let hash = user.passwordHash;
        if (user &&
            user.confirmed &&
            isHashesEqual(salt, user.passwordHash, password)) {
            let connectionData = getUserIpAndAgent(req);
            let token = new Token({
                userId: user._id,
                userAgent: connectionData.userAgent,
                userIp: connectionData.ip,
                tokenHash: generateToken()
            })
            token.save()
                .then(user => {
                    res.status(200).json({"token":user.tokenHash});
                })
                .catch(err => {
                    next(errObj.createError('can not create token', 400))
                })
        }

    }).catch(err => {
        next(errObj.createError('no such user', 505))
    })
}
function verifyToken(req, res, next) {
    let token = req.token
    Token.findOne({ tokenHash: token })
        .populate({
            path: 'userId',
            model: 'User',
            select: 'firstname lastname email role'
        })
        .exec()
        .then(data => {
            let connectionCredentials = getUserIpAndAgent(req);
            if (!isTokenCredentialsValid(data, connectionCredentials)) {
                next(errObj.createError('access denied', 403))
            }
            req.data.user = data.userId;
            next();
        })
        .catch(err => {
            next(errObj.createError('can`t find such token', 400))
        })
}
function verifyAdmin(req,res,next){
    if(req.data.user.role===config.userPrivilages.admin)next();
    next(errObj.createError('don`t have acces',403))
}
let isTokenCredentialsValid = (tokenModel, reqCredentials) => {
    return tokenModel.userAgent === reqCredentials.userAgent &&
        tokenModel.userIp === reqCredentials.ip &&
        tokenModel.tokenHash === reqCredentials.token;
}
function isHashesEqual(salt, hash, password) {
    let credentialHash = hashPasswordSha512(String(password), salt);
    let isEqual = hash === credentialHash.passwordHash
    return isEqual;
}
let generateToken = () => {
    return crypto.randomBytes(16).toString('hex');
}
let getUserIpAndAgent = (req) => {
    return {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        token: req.token
    }
}
module.exports = {
    createUser: createUser,
    createUserToken: createUserToken,
    sendConfirmationEmail: sendConfirmationEmail,
    verifyUserConfirmation: verifyUserConfirmation,
    verifyToken: verifyToken,
    verifyAdmin:verifyAdmin
}
