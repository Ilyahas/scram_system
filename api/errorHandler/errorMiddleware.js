function errHandler(err, req, res, next) {
  if (err.code === 11000) {
    let [, field] = err.message.split('index:');
    [field] = field.split(' dup key')
    field = field.substring(1, field.lastIndexOf('_'))
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        error: err.message,
        duplicate: field,
      },
    })
  } else {
    console.log('==============================')
    console.log(err)
    console.log('request', req)
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        err,
      },
    })
  }
}
module.exports = errHandler
