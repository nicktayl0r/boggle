const express = require('express');
const socketIO = require('socket.io')
const path = require('path');

const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(require('./config/auth'));

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/users', require('./routes/api/users'));
app.use('/api/scores', require('./routes/api/scores'));


app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

var port = process.env.PORT || 3001;

const server = app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

const io = socketIO(server);

require('./io').attach(server);