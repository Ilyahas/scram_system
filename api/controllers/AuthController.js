const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Token = require('../models/token')
const Company = require('../models/company')
const config = require('../../config/config')
const errObj = require('../utils/parseErrors')
const emailSender = require('../utils/sendgrid')

const algorithm = 'sha512'
const stringLenght = 16
const generateRandomString = lenght => crypto
  .randomBytes(Math.ceil(lenght / 2))
  .toString('hex')
  .slice(0, lenght)

const hashPasswordSha512 = (password, salt) => {
  const hash = crypto.createHmac(algorithm, salt)
  hash.update(password)
  const value = hash.digest('hex')
  return {
    salt,
    passwordHash: value,
  }
}
const saltHashPassword = (userPassword) => {
  const salt = generateRandomString(stringLenght)
  return hashPasswordSha512(userPassword, salt)
}
const generateJWT = email =>
  jwt.sign(
    {
      email,
    },
    config.secretKey,
  )
function responseJSON(res, code, requestStatus, requestResult) {
  return res.status(code).json({ requestStatus, requestResult })
}
// conf token for use model
const getCongirmationToken = email => generateJWT(email)

async function signupUser(req, res, next) {
  const userCredentials = req.body
  try {
    const user = await createUser(userCredentials)
    const company = await createCompany(user._id, userCredentials.companyName)
    user.company = company._id
    await user.save()
    emailSender.sendConfirmationEmail(user)
    responseJSON(res, 200, true, {})
  } catch (err) {
    next(err)
  }
}
function createUser(data) {
  const hashedPassword = saltHashPassword(data.password)
  const confirmationToken = getCongirmationToken(data.email)
  const userData = data
  userData.salt = hashedPassword.salt
  userData.passwordHash = hashedPassword.passwordHash
  userData.confirmationToken = confirmationToken
  return User.create(userData)
}
function createCompany(owner, companyName) {
  return Company.create({ owner, companyName })
}
async function verifyUserConfirmation(req, res, next) {
  const { token } = req.params
  try {
    const user = await User.findOneAndUpdate(
      { confirmationToken: token },
      { confirmationToken: '', confirmed: true },
      { new: true },
    )
    if (!user) return responseJSON(res, 400, false, { error: 'email confirmation failed' })
    responseJSON(res, 200, true, {})
  } catch (err) {
    next(err)
  }
}
async function createUserToken(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user.confirmed) responseJSON(res, 400, false, { error: 'Confirm Email' })
    const { salt } = user
    if (user && user.confirmed && isHashesEqual(salt, user.passwordHash, password)) {
      const connectionData = getUserIpAndAgent(req)
      const userToken = new Token({
        userId: user._id,
        userAgent: connectionData.userAgent,
        userIp: connectionData.ip,
        tokenHash: generateToken(),
      })
      const token = await userToken.save()
      return responseJSON(res, 200, true, {
        token: token.tokenHash,
        user: {
          email: user.email,
          nickname: user.nickname,
        },
      })
    }
    responseJSON(res, 403, false, {})
  } catch (error) {
    responseJSON(res, 403, false, { error: 'Access denied' })
  }
}
function verifyToken(req, res, next) {
  const { token } = req
  if (!token) return responseJSON(res, 403, false, { error: 'access denied' })
  Token.findOne({ tokenHash: token })
    .populate({
      path: 'userId',
      model: 'User',
      select: 'nickname email role ',
    })
    .exec()
    .then((data) => {
      const connectionCredentials = getUserIpAndAgent(req)
      if (!isTokenCredentialsValid(data, connectionCredentials)) {
        return responseJSON(res, 403, false, { error: 'access denied' })
      }
      req.user = data.userId
      next()
    })
    .catch((err) => {
      next(err)
    })
}
function verifyAdmin(req, res, next) {
  if (req.user.role === config.userPrivilages.admin) {
    return next()
  }
  return next(errObj.createError('don`t have access', 400))
}
let isTokenCredentialsValid = (tokenModel, reqCredentials) =>
  tokenModel.tokenHash === reqCredentials.token
function isHashesEqual(salt, hash, password) {
  const credentialHash = hashPasswordSha512(String(password), salt)
  const isEqual = hash === credentialHash.passwordHash
  return isEqual
}
// TODO: logout
// function logout(req, res, next) {}
let generateToken = () => crypto.randomBytes(16).toString('hex')
let getUserIpAndAgent = req => ({
  ip: req.ip,
  userAgent: req.get('User-Agent'),
  token: req.token,
})
module.exports = {
  signupUser,
  createUserToken,
  verifyUserConfirmation,
  verifyToken,
  verifyAdmin,
}
