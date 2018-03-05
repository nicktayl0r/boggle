import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 100);
// }


function startGame(n){
    socket.on('start-game', (game) => n(game))
}

function userJoin(user, n){
    socket.on('return-users', (users) => n(users));   
    socket.emit('users-in-lobby', user);
}
   
function newRound(n){
    socket.emit('make new round');
    socket.on('new-round-made', (round, gameTimer) => n(round, gameTimer))
}

function endGame(n, score, words, index){
    socket.emit('game-over', score, words, index)
    socket.on('over-game',(a) => n(a))
}

export {
    userJoin,
    newRound,
    startGame,
    endGame
}