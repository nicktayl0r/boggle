import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 100);
// }



function userJoin(user){
    socket.emit('user in lobby', user);
    socket.on('users in lobby', users => {return users});   
}



function setNewRound(){
    socket.on('new round made', (roundCount, round)  => {
        (roundCount > round.length) ?  console.log(` You are in round ${round.length} of ${roundCount}`) : console.log('The game is now over');
    })
    socket.emit('newRound');
        
};
   
    


export {
    // subscribeToTimer, 
    setNewRound,
    userJoin
}