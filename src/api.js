import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 100);
// }

let gameRound;

function userJoin(user){
    socket.emit('user in lobby', user);
    socket.on('users in lobby', users => {return users});   
}
   
function newRound(n){
    console.log('new round requested')
    socket.emit('make new round');
    socket.on('new-round-made', (round, gameTimer) => n(round, gameTimer))
}

    


export {
    // subscribeToTimer, 
    userJoin,
    newRound
}