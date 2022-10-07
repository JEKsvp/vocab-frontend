module.exports = class ErrorDto {
    constructor(message) {
        this.message = message;
    }

    static internalServerError() {
        return new ErrorDto('Internal server error')
    }

    static unauthorized(){
        return new ErrorDto('Unauthorized')
    }

    static forbidden(){
        return new ErrorDto('Forbidden')
    }
};