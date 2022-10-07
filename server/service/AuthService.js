const tokenStorage = require('./storage/LocalTokenStorage')
const sessionService = require('../service/SessionService')
const authConfiguration = require('./AuthConfiguration')

const AuthService = {
    UNAUTHORIZED: {message: "Token not found"},

    authorizeRequest: async function (req) {
        try {
            const sessionId = sessionService.extractSessionId(req)
            const token = await tokenStorage.get(sessionId)
            req.headers['Authorization'] = `Bearer ${token.access_token}`
        } catch (e) {
            if (e === tokenStorage.TOKEN_NOT_FOUND || e === sessionService.SESSION_NOT_FOUND) {
                throw this.UNAUTHORIZED;
            } else {
                console.error(e);
                throw e;
            }
        }
    },

    needAuthorization: function (req) {
        return !authConfiguration.publicUrls.includes(req.url);
    }
}

module.exports = AuthService;

