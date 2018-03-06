const io = require('socket.io')();

// require client side game logic, user model, and the game model


let roundNo = -1
let users = [];
let collection = [];

class gameObject  {
    constructor(round, roundNo, players){
        this.round = round;
        this.roundNo = roundNo;
        this.players = players;
        this.gameScores = gameScores;
        this.gameWords = gameWords
    }
}
let round;


let gameScores = [];
let gameWords = [];
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
    client.on('return-users', (user) => {
        users.push({user: user, clientId: client.id});
        console.log(`User ${user} is in the lobby`);
        if(users.length % 2 === 0 && users.length > 0 ){
            console.dir('sufficient users found');
                let newPlayers = [];
                
                let inDice = dice.slice(0);
                let outDice = [];
                let gameTimer = 240;
                
    
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

                buildGame(collection[roundNo]["roundNo"])
                
                io.to(`game ${roundNo}`).emit('start-game', collection[roundNo]);
            
            } else {
                console.log(`the lobby has ${users.length} players`);
            }

        })
    
        client.on('game-over', (score, words, index) => {
            collection[roundNo].gameScores[index] = score
            collection[roundNo].gameWords[index] = words
            if (collection[roundNo].gameScores.length > 1 && !collection[roundNo].gameScores.includes(null)){
                io.to(`game ${roundNo}`).emit('over-game', collection[roundNo]);
            }
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

        }
        
      
    })
    
io.on('disconnection', (client)=> {
    console.log(`client ${client} has disconnected, ${users} are still connected `)
});


module.exports = io;