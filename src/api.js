import io from 'socket.io-client';
var socket = io();

function startGame(n){
    socket.on('start-game', (game) => n(game))
}

function userJoin(user, n){
    socket.on('users-return', (users) => n(users));   
    socket.emit('return-users', user);
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