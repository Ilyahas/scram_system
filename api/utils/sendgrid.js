let fs = require('fs')
let path = require('path')
let config = require('../../config/config')
let hogan = require('hogan.js')
let sendGrid = require('sendgrid')(config.apiKey)
let template = fs.readFileSync(path.resolve(__dirname, '../../views/confirmation.hjs'), 'utf-8')
let compileTemplate = hogan.compile(template)
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
let generateConfirmationUrl = confirmationToken => {
  return `${config.host}/auth/confirmation/${confirmationToken}`
}
module.exports.sendConfirmationEmail = sendConfirmationEmail
