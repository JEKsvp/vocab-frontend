// const redis = require("redis");
// const redisProperties = require("../env/RedisProperties")
// const RedisClient = redis.createClient(
//     {
//         host: redisProperties.host,
//         port: redisProperties.port,
//         password: redisProperties.password
//     }
// );
//
// RedisClient.on("error", function (err) {
//     console.error("REDIS ERROR", err)
// });
//
//
// const getAsync = function (sessionId) {
//     return new Promise(async (resolve, reject) =>
//         RedisClient.get(sessionId, function (err, res) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(res)
//             }
//         })
//     )
// }
//
// const setAsync = function (key, value, ttl) {
//     return new Promise(async (resolve, reject) =>
//         RedisClient.set(key, value, 'EX', ttl, function (err, res) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(res)
//             }
//         })
//     )
// }
//
// const delAsync = function (sessionId) {
//     return new Promise(async (resolve, reject) =>
//         RedisClient.del(sessionId, function (err, res) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(res)
//             }
//         })
//     )
// }
//
// module.exports = RedisClient
// module.exports.getAsync = getAsync
// module.exports.setAsync = setAsync
// module.exports.delAsync = delAsync