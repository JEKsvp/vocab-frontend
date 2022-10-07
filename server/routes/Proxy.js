const router = require('express').Router();
const backendClient = require('../client/BackendClient')

router.all('/v1/*', async (req, res) => {
    await backendClient.sendRequest(req, res);
});


module.exports = router