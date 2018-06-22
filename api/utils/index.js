const stringLenght = 16
const crypto = require('crypto')
module.exports = {
  saltHashPassword: password => {
    const salt = generateRandomString(stringLenght)
    return hashPasswordSha512(password, salt)
  },
  generateRandomString: lenght =>
    crypto
      .randomBytes(Math.ceil(lenght / 2))
      .toString('hex')
      .slice(0, lenght),
  hashPasswordSha512: (password, salt) => {
    const hash = crypto.createHmac(algorithm, salt)
    hash.update(password)
    const value = hash.digest('hex')
    return {
      salt,
      passwordHash: value,
    }
  },
}
