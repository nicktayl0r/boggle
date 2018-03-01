const io = require('socket.io')();

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

  module.exports = io;