const ErrorDto = require('./dto/ErrorDto')

const ErrorBuilder = {
    unauthorized: function (res) {
        res.status(401)
            .json(ErrorDto.unauthorized())
    },
    forbidden: function (res) {
        res.status(403)
            .json(ErrorDto.forbidden())
    },
    clientError: function (res, err) {
        res.status(err.response.status)
            .json(err.response.data)
    },
    internalServerError: function (res) {
        res.status(500)
            .json(ErrorDto.internalServerError())
    },
    badRequest: function (res, message) {
        res.status(400)
            .json(new ErrorDto(message))
    }
}

module.exports = ErrorBuilder