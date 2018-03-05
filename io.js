const io = require('socket.io')();
// require client side game logic, user model, and the game model
let User = require('./models/user');

let roundNo = -1
let users = [];
let collection = [];

class gameObject  {
    constructor(round, roundNo, players){
        this.round = round;
        this.roundNo = roundNo;
        this.players = players;
    }
}
let round;


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
    console.log(users);
    client.join('lobby')
    client.on('users-in-lobby', (user) => {
        users.push({user: user, clientId: client.id});
        console.log(`User ${user} is in the lobby`);
        // io.emit('return-users', users)
        if(users.length % 2 === 0 && users.length > 0 ){
            console.dir('sufficient users found');
                let inDice = dice.slice(0);
                let outDice =[];
                let gameTimer = 240;
                let newPlayers = [];

                while(inDice.length > 0) {
                    let randIndex = Math.floor(inDice.length*Math.random());
                    outDice.push(inDice[randIndex]);
                    inDice.splice(randIndex, 1);
                }

                round = outDice.map(x => x[Math.floor(Math.random()*6)]);
                roundNo++;
                newPlayers.push(users.pop()); 
                newPlayers.push(users.pop());
                collection[roundNo] = new gameObject(round, roundNo, newPlayers);
                console.log(JSON.stringify(collection[roundNo]));

                buildGame(collection[roundNo]["roundNo"])

                io.to(`game ${roundNo}`).emit('start-game', collection[roundNo]);
            
            } else {
                console.log(`the lobby has ${users.length} players`);
            }

        })
        client.on('game-over', (score, words, index) => {
            console.log(score);
            console.log(words);
            console.log(index);
        })
        function  getClientsInRoom(room){
            let clients =[];
            for(let c in io.sockets.adapter.rooms[room].sockets)
                clients.push(io.sockets.connected[c]);
            return clients;
        }
        
        function buildGame(gameData){
            let players = getClientsInRoom('lobby')
            players[0].leave('lobby');
            players[1].leave('lobby');
            players[0].join(`game ${gameData}`);
            players[1].join(`game ${gameData}`);
            console.log(io.sockets.adapter.rooms);

        }
    })
    //at the end of a round, show who has won
    
    // when timer is up tally scores and notify the players of who has won
    
io.on('disconnection', (client)=> {
    console.log(`client ${client} has disconnected, ${users} are still connected `)
});


    //handle roundend

  module.exports = io;