
import io from 'socket.io-client';

const socket = io();
let Game;

export default socket;

export function registerGameComponenet(GameComp) {
    Game = GameComp;
    socket.on('start-game', (game) => Game.handleGame(game))
    socket.on('users-return', (users) => Game.getUsers(users));   
}