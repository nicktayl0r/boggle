const express = require('express');
const socketIO = require('socket.io')
const path = require('path');

const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./config/db');

var app = express();

app.use(logger('dev'));
app.use(require('./config/auth'));

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/users', require('./routes/api/users'));
app.use('/api/scores', require('./routes/api/scores'));


app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

var port = process.env.PORT || 3001;

const server = app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

const io = socketIO(server);

let User = require('./models/user');

let roundNo = -1;
let users = [];
let collection = [];

class gameObject  {
    constructor(round, roundNo, players, gameScores, gameWords){
        this.round = round;
        this.roundNo = roundNo;
        this.players = players;
        this.gameScores = gameScores;
        this.gameWords = gameWords;
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

io.on('connection', (socket) => {
    console.log(`Client ${socket.id} is connected at ${new Date().toISOString()}.`);
    console.log(users);
    socket.join('lobby');
    socket.on('return-users', (user) => {
        users.push({user: user, clientId: socket.id});
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
                buildGame(collection[roundNo]["roundNo"]);
                console.log(JSON.stringify(collection));


                io.to(`game ${roundNo}`).emit('start-game', collection[roundNo]);
            
            } else {
                console.log(`the lobby has ${users.length} players`);
            }

        })
        io.on('game-over', (score, words, index) => {
            collection[roundNo].gameScores[index] = score;
            collection[roundNo].gameWords[index] = words;
            io.to(`game ${roundNo}`).emit('over-game', collection[roundNo]);
        })
        function  getClientsInRoom(room){
            let clients =[];
            for(let c in io.sockets.adapter.rooms[room].sockets){
                clients.push(io.sockets.connected[c]);
            }
            return clients;
        }
        
        function buildGame(gameData){
            let players = getClientsInRoom('lobby');
           
            players[1].leave('lobby');
            players[0].leave('lobby');
            players[1].join(`game ${gameData}`);
            players[0].join(`game ${gameData}`);
        }
    })
    
io.on('disconnection', (client)=> {
    console.log(`client ${client} has disconnected, ${users} are still connected `);
});



