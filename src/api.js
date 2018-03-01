import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3002');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 100);
}

// from front end to back
    function makeGame(){
        //creates game object in database, cannot run if a game exists
        //kills old game if boolean returns false

    }
    function setScores(){
        // update scores from the actions done in the last round
        
    }

    function makeRound(){
        // create gameboard
        // start timer

    }
//new functions
    function joinGame(){
        //creates game object i, 
    
    }
    function returnGameWinners(){
        //creates game object in database

    }


export {subscribeToTimer}