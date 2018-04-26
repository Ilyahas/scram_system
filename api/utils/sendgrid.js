const fs = require('fs')
const path = require('path')
const config = require('../../config/config')
const hogan = require('hogan.js')
const sendGrid = require('sendgrid')(config.apiKey)

const template = fs.readFileSync(path.resolve(__dirname, '../../views/confirmation.hjs'), 'utf-8')
const compileTemplate = hogan.compile(template)
function sendConfirmationEmail(user) {
  return sendGrid.send({
    to: user.email,
    from: 'noreply@scrumdesk.com',
    subject: 'Welcom to ScrumDesk. Please confirm your email',
    html: compileTemplate.render({
      nickname: user.nickname,
      token: generateConfirmationUrl(user.confirmationToken),
    }),
  })
}
let generateConfirmationUrl = confirmationToken =>
  `${config.host}/auth/confirmation/${confirmationToken}`
module.exports.sendConfirmationEmail = sendConfirmationEmail
