const io = require('socket.io')();

// require client side game logic, user model, and the game model
let User = require('./models/user');

let roundNo = 0
let users = ['oh hello'];
let collection =[];

class gameObject  {
    constructor(game, roundNo, players){
        this.game = [];
        this.roundNo = roundNo;
        this.players = [];
    }
}

let round = [];

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



io.on('connection', (client) => {
    console.log(`Client ${client.id} is connected at ${new Date().toISOString()}.`);
    
    client.on('user in lobby', (user) => {
        !users.includes(user) ? users.push(user): console.log(`user ${user} is already in the lobby`);
        console.log(`User ${user} is in the lobby`);
        console.log(users)
        client.emit('users in lobby', users)
    })

    client.on('make new round', () => {
        console.log('making a round on the server')
        let inDice = dice.slice(0);
        let outDice =[];
        let gameTimer = 240;
        while(inDice.length > 0) {
            let randIndex = Math.floor(inDice.length*Math.random());
            outDice.push(inDice[randIndex]);
            inDice.splice(randIndex, 1);
        }
        round = outDice.map(x => x[Math.floor(Math.random()*6)]);
        client.emit('new-round-made', round, gameTimer)


        if(users.length % 2 === 0 ){
            roundNo++;
            let newPlayers = []
            newPlayers.push(users.pop()); 
            newPlayers.push(users.pop());
            collection[roundNo] = new gameObject(round, roundNo, newPlayers);
            console.log(JSON.stringify(collection));

            // client.emit('start game', [gameObject])
        } else {
            console.log(`the lobby has an odd number of players`);
            console.log(users)
        }
    })


    // add users to lobby, when the lobby has 2 parties, begin a game
    // 5 seconds before game start, create game board and timer here
    
    // when timer is up tally scores and notify the players of who has won
    
    
});


io.on('disconnection', (client)=> {
    console.log(`client ${client} has disconnected, ${users} are still connected `)

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