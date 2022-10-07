const backendUrl = require('../env/BackendUrl');
const clientCredentials = require('../env/ClientCredentials')
const axios = require('axios');
const qs = require('qs');

const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': getAuthHeader()
};

function getAuthHeader() {
    let base64Credentials = new Buffer.from(`${clientCredentials.clientId}:${clientCredentials.clientSecret}`)
        .toString('base64');
    return `Basic ${base64Credentials}`
}

const getTokenByLogin = async function (username, password) {
    const requestBody = {
        'grant_type': 'password',
        'username': username,
        'password': password
    };
    const tokenResponse = await axios.post(
        `${backendUrl}/oauth/token`,
        qs.stringify(requestBody),
        {headers: headers}
    );
    return tokenResponse.data;
}

const getTokenByRefreshToken = async function (refreshToken) {
    const requestBody = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
    };
    const tokenResponse = await axios.post(
        `${backendUrl}/oauth/token`,
        qs.stringify(requestBody),
        {headers: headers}
    );
    return tokenResponse.data;
}

module.exports.getTokenByLogin = getTokenByLogin
module.exports.getTokenByRefreshToken = getTokenByRefreshToken