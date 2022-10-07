// const tokenClient = require('../../client/TokenClient')
// const redisClient = require('../RedisClient')
//
// const RedisTokenStorage = {
//     TOKEN_NOT_FOUND: {message: "Token not found"},
//     TOKEN_TTL: 60 * 60 * 24 * 21,
//
//     async put(sessionId, tokenContainer) {
//         await redisClient.setAsync(sessionId, JSON.stringify(tokenContainer), this.TOKEN_TTL);
//     },
//
//     async get(sessionId) {
//         let tokenString = await redisClient.getAsync(sessionId);
//         validateToken(tokenString)
//         return JSON.parse(tokenString);
//     },
//
//     async remove(sessionId) {
//         await redisClient.delAsync(sessionId);
//     },
//
//     async refresh(sessionId) {
//         let tokenString = await redisClient.getAsync(sessionId);
//         validateToken(tokenString)
//         let token = JSON.parse(tokenString);
//         let newToken = await tokenClient.getTokenByRefreshToken(token.refresh_token);
//         console.debug("Token refreshed")
//         await redisClient.setAsync(sessionId, JSON.stringify(newToken), this.TOKEN_TTL);
//     }
// };
//
// function validateToken(token) {
//     if (!token) {
//         throw RedisTokenStorage.TOKEN_NOT_FOUND
//     }
// }
//
// module.exports = RedisTokenStorage;