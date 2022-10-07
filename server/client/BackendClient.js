const backendUrl = require('../env/BackendUrl')
const axios = require('axios')
const tokenStorage = require('../service/storage/LocalTokenStorage')
const errorBuilder = require('../routes/ErrorBuilder')
const sessionService = require('../service/SessionService')
const authService = require('../service/AuthService')

const sendRequest = async function (req, res) {
    try {
        if (authService.needAuthorization(req)) {
            await authService.authorizeRequest(req)
        }
        await sendRequestInternal(req, res)
    } catch (e) {
        await handleBackendError(req, res, e, true)
    }
}

async function sendRequestInternal(req, res) {
    const proxyResp = await axios.request({
        url: `${backendUrl}${req.url}`,
        data: req.body,
        method: req.method,
        headers: req.headers
    });
    res.status(proxyResp.status).send(proxyResp.data)
}

function isClientError(e) {
    return e.response && e.response.status >= 400 || e.response.status < 500;
}

async function handleBackendError(req, res, err, needRetry) {
    console.debug(err);
    if (err === authService.UNAUTHORIZED) {
        errorBuilder.unauthorized(res)
    } else if (err.response && err.response.status === 401) {
        if (needRetry) {
            await retry(req, res)
            return
        }
        errorBuilder.unauthorized(res)
    } else if (err.response && err.response.status === 403) {
        errorBuilder.forbidden(res)
    } else if (isClientError(err)) {
        errorBuilder.clientError(res, err)
    } else {
        console.error(err)
        errorBuilder.internalServerError(res)
    }
}

async function retry(req, res) {
    try {
        let sessionId = sessionService.extractSessionId(req)
        await tokenStorage.refresh(sessionId)
        await authService.authorizeRequest(req)
        await sendRequestInternal(req, res)
    } catch (ex) {
        await handleBackendError(req, res, ex, false)
    }
}

module.exports.sendRequest = sendRequest