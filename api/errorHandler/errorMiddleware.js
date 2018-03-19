function errHandler(err, req, res, next) {
  console.error(err.message);
  if (err.code===11000){
    res.status(400).json({
      requestStatus:false,
      requestResult:{
        error:err.message
      }
    })
  }else{
    res.status(400).json({
      requestStatus:false,
      requestResult:{
        error
      }
    })
    
  }
}
module.exports.errHandler = errHandler