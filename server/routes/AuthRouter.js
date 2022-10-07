var router = require('express').Router();
const {v4} = require('uuid')
const tokenClient = require('../client/TokenClient')
const sessionService = require('../service/SessionService')
const tokenStorage = require('../service/storage/LocalTokenStorage');
const errorBuilder = require('../routes/ErrorBuilder')

router.post('/login', async (req, res) => {
    try {
        let token = await tokenClient.getTokenByLogin(req.body.username, req.body.password);
        const sessionId = v4()
        await tokenStorage.put(sessionId, token)
        sessionService.setSession(res, sessionId)
        res.status(200).send()
    } catch (e) {
        if (e.response && e.response.status === 400) {
            errorBuilder.badRequest(res, 'Invalid login or password')
        } else {
            console.error(e)
            errorBuilder.internalServerError(res)
        }
    }
});

router.post('/logout', async (req, res) => {
    try {
        let sessionId = sessionService.extractSessionId(req);
        sessionService.clearSession(res)
        await tokenStorage.remove(sessionId)
        res.status(200).send()
    } catch (e) {
        console.error(e)
        errorBuilder.internalServerError(res)
    }
});

module.exports = router