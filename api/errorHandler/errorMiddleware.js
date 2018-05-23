function errHandler(err, req, res) {
  if (err.code === 11000) {
    let [, field] = err.message.split('.$');
    [field] = field.split(' dup key')
    field = field.substring(0, field.lastIndexOf('_'))
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
    console.log('request',req)
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        err,
      },
    })
  }
}
module.exports.errHandler = errHandler
