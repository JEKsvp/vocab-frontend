const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serverProperties = require('./env/ServerProperties')
const app = express();


app.use(express.static('public/dist'));
app.use(bodyParser.json());
app.use(cookieParser())
app.listen(serverProperties.SERVER_PORT, () => console.log(`Server started on port ${serverProperties.SERVER_PORT}`));
app.use(require('./routes/AuthRouter'));
app.use(require('./routes/Proxy'));


