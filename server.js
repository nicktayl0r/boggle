var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
const io = require('socket.io')();

require('dotenv').config();
require('./config/db');

var app = express();

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


app.use(require('./config/auth'));

app.use(bodyParser.json());

app.use('/api/users', require('./routes/api/users'));


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval', interval);
      setInterval(() => {
          client.emit('timer', new Date());
      }, interval)
  });
});

const thisPort = 3002
io.listen(thisPort);
console.log('socket.io is listening on port', thisPort);