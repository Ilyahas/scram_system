class BaseController {
    responseJSON(res, code, requestStatus, requestResult) {
        return res.status(code).json({ requestStatus, requestResult })
    }
}

module.exports = BaseController;