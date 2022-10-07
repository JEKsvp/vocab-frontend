const tokenClient = require('../../client/TokenClient')

const sessionTokenMap = new Map();

const LocalTokenStorage = {
    TOKEN_NOT_FOUND: {message: "Token not found"},

    put(sessionId, tokenContainer) {
        sessionTokenMap.set(sessionId, tokenContainer);
    },

    get(sessionId) {
        let token = sessionTokenMap.get(sessionId);
        validateToken(token)
        return token;
    },

    remove(sessionId) {
        sessionTokenMap.delete(sessionId);
    },

    async refresh(sessionId) {
        let token = sessionTokenMap.get(sessionId);
        validateToken(token)
        let newToken = await tokenClient.getTokenByRefreshToken(token.refresh_token);
        console.debug("Token refreshed")
        sessionTokenMap.set(sessionId, newToken);
    }
};

function validateToken(token) {
    if (!token) {
        throw LocalTokenStorage.TOKEN_NOT_FOUND
    }
}

module.exports = LocalTokenStorage;
