const io = require('socket.io')();

// require client side game logic, user model, and the game model
let User = require('./models/user');


let users = [];
let gameIdCounter = 0;

let dice = [
    ['R', 'I', 'F', 'O', 'B', 'X'],
    ['I', 'F', 'E', 'H', 'E', 'Y'],
    ['D', 'E', 'N', 'O', 'W', 'S'],
    ['U', 'T', 'O', 'K', 'N', 'D'],
    ['H', 'M', 'S', 'R', 'A', 'O'],
    ['L', 'U', 'P', 'E', 'T', 'S'],
    ['A', 'C', 'I', 'T', 'O', 'A'],
    ['Y', 'L', 'G', 'K', 'U', 'E'],
    ['Qu', 'B', 'M', 'J', 'O', 'A'],
    ['E', 'H', 'I', 'S', 'P', 'N'],
    ['V', 'E', 'T', 'I', 'G', 'N'],
    ['B', 'A', 'L', 'I', 'Y', 'T'],
    ['E', 'Z', 'A', 'V', 'N', 'D'],
    ['R', 'A', 'L', 'E', 'S', 'C'],
    ['U', 'W', 'I', 'L', 'R', 'G'],
    ['P', 'A', 'C', 'E', 'M', 'D']
];


let round = [];


io.on('connection', (client) => {
    console.log(`Client ${client.id} is connected at ${new Date().toISOString()}.`);
    
    client.on('user in lobby', (user) => {
        !users.includes(user) ? users.push(user): console.log(`user ${user} is already in the lobby`);
        console.log(`User ${user} is in the lobby`);
        client.emit('users in lobby', users)
    })
    
    // add users to lobby, when the lobby has 2 parties, begin a game
    // 5 seconds before game start, create game board and timer here

    // when timer is up tally scores and notify the players of who has won

    
});



    // client.on('subscribeToTimer', (interval) => {
    //     // console.log('client is subscribing to timer with interval', interval);
    //     setInterval(() => {
    //         client.emit('timer', new Date());
    //     }, interval)
    // });


    //handle roundstart
    
    
    //handle roundend






//should pull all clients to a playerlist array


//1 add clients to a game
    // if user is not in some array of users
    // if players in game is less than the playerTarget



  module.exports = io;