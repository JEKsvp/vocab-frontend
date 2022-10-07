const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const serverProperties = require('./env/ServerProperties')
const path = require('path')
const app = express();


app.use(express.static('public/dist'));
app.use(bodyParser.json());
app.use(cookieParser())
app.listen(serverProperties.SERVER_PORT, () => console.log(`Server started on port ${serverProperties.SERVER_PORT}`));
app.use(require('./routes/AuthRouter'));
app.use(require('./routes/Proxy'));
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'dist', 'index.html')));


