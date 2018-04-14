let crypto = require('crypto');
let jwt = require('jsonwebtoken');


let User = require('../models/user')
let Token = require('../models/token')
let Company = require('../models/company')
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
function responseJSON(res, code, requestStatus, requestResult) {
    return res.status(code).json({ requestStatus, requestResult })
}
//conf token for use model
let getCongirmationToken = (email) => {
    return generateJWT(email);
}

async function signupUser(req, res, next) {
    console.log(req.body);
    let userCredentials = req.body;
    try {
        let user = await createUser(userCredentials);
        let company = await createCompany(user._id, userCredentials.companyName)
        user.company = company._id;
        await user.save()
        let email = await emailSender.sendConfirmationEmail(user);
        responseJSON(res, 200, true, {})
    } catch (err) {
        next(err)
    }
}
function createUser(data) {
    let hashedPassword = saltHashPassword(data.password);
    let confirmationToken = getCongirmationToken(data.email)
    data.salt = hashedPassword.salt;
    data.passwordHash = hashedPassword.passwordHash;
    data.confirmationToken = confirmationToken;
    return User.create(data)
}
function createCompany(owner, companyName) {
    return Company.create({ owner, companyName })
}
async function verifyUserConfirmation(req, res, next) {
    let token = req.params.token;
    try {
        let user = await User.findOneAndUpdate(
            { confirmationToken: token },
            { confirmationToken: '', confirmed: true },
            { new: true }
        )
        if (!user) return responseJSON(res, 400, false, { error: "email confirmation failed" })
        responseJSON(res, 200, true, {})
    } catch (err) {
        next(err)
    }
}
async function createUserToken(req, res, next) {
    let { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (!user.confirmed) responseJSON(res, 400, false, { error: "Confirm Email" })
        let salt = user.salt;
        let hash = user.passwordHash;

        if (user &&
            user.confirmed &&
            isHashesEqual(salt, user.passwordHash, password)) {
            let connectionData = getUserIpAndAgent(req);
            let userToken = new Token({
                userId: user._id,
                userAgent: connectionData.userAgent,
                userIp: connectionData.ip,
                tokenHash: generateToken()
            })
            let token = await userToken.save();
            responseJSON(res, 200, true,
                {
                    "token": token.tokenHash,
                    'user': {
                        email: user.email,
                        nickname: user.nickname
                    }
                })
        }
        responseJSON(res, 403,false,{})
    } catch (error) {
        responseJSON(res, 403, false, { error: "Access denied" })
    }
}
function verifyToken(req, res, next) {
    let token = req.token
    Token.findOne({ tokenHash: token })
        .populate(
            {
                path: 'userId',
                model: 'User',
                select: 'nickname email role '
            }
        )
        .exec()
        .then(data => {
            let connectionCredentials = getUserIpAndAgent(req);
            if (!isTokenCredentialsValid(data, connectionCredentials)) {
                return responseJSON(res,403,false,{error:'access denied'})
            }
            req.user = data.userId;
            next();
        })
        .catch(err => {
            next(err)
        })
}
function verifyAdmin(req, res, next) {
    if (req.user.role === config.userPrivilages.admin) {
        return next()
    }
    return next(errObj.createError('don`t have access', 400))
}
let isTokenCredentialsValid = (tokenModel, reqCredentials) => {
    return  tokenModel.tokenHash === reqCredentials.token;
}
function isHashesEqual(salt, hash, password) {
    let credentialHash = hashPasswordSha512(String(password), salt);
    let isEqual = hash === credentialHash.passwordHash
    return isEqual;
}
//TODO: logout
function logout(req, res, next) {

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
    signupUser: signupUser,
    createUserToken: createUserToken,
    verifyUserConfirmation: verifyUserConfirmation,
    verifyToken: verifyToken,
    verifyAdmin: verifyAdmin
}
