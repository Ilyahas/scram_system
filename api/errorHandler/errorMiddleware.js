function errHandler(err, req, res, next) {
  console.error(err.message);
  if (err.code === 11000) {
    let field = err.message.split('.$')[1];
    // now we have `email_1 dup key`
    field = field.split(' dup key')[0];
    field = field.substring(0, field.lastIndexOf('_')); // returns email
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        error: err.message,
        duplicate:field
      }
    })
  } else {
    res.status(400).json({
      requestStatus: false,
      requestResult: {
        err
      }
    })

  }
}
module.exports.errHandler = errHandler