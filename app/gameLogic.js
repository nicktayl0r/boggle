// class GameLogic {

//     dice = [
//         ['R', 'I', 'F', 'O', 'B', 'X'],
//         ['I', 'F', 'E', 'H', 'E', 'Y'],
//         ['D', 'E', 'N', 'O', 'W', 'S'],
//         ['U', 'T', 'O', 'K', 'N', 'D'],
//         ['H', 'M', 'S', 'R', 'A', 'O'],
//         ['L', 'U', 'P', 'E', 'T', 'S'],
//         ['A', 'C', 'I', 'T', 'O', 'A'],
//         ['Y', 'L', 'G', 'K', 'U', 'E'],
//         ['Qu', 'B', 'M', 'J', 'O', 'A'],
//         ['E', 'H', 'I', 'S', 'P', 'N'],
//         ['V', 'E', 'T', 'I', 'G', 'N'],
//         ['B', 'A', 'L', 'I', 'Y', 'T'],
//         ['E', 'Z', 'A', 'V', 'N', 'D'],
//         ['R', 'A', 'L', 'E', 'S', 'C'],
//         ['U', 'W', 'I', 'L', 'R', 'G'],
//         ['P', 'A', 'C', 'E', 'M', 'D']
//     ];

//     // takes word as argument returns score by word length
//     handleScore = (w) => {
//         console.log(w);
//         switch(w.length) {
//             case 3:
//                 return 1;
//                 break;
//             case 4:
//                 return 1;
//                 break;
//             case 5:
//                 return 2;
//                 break;
//             case 6:
//                 return 3;
//                 break;
//             case 7:
//                 return 5;
//                 break;
//             default:
//                 return 11
//         }
//     }

//         //reduces countdown by one 
//     handleTick = () => {
//         countdown = countdown--
//     }
//         // create new round
//     newRound = () => {
//         let inDice = dice.slice(0);
//         let outDice =[];
//         for (let i in inDice) {
//             let randIndex = Math.floor(inDice.length*Math.random());
//             outDice.push(inDice[randIndex]);
//             inDice.splice(randIndex, 0);
//         }
//         let gameboard = outDice.map(x => x[Math.floor(Math.random()*6)]);
        
//         let round = gameboard;

//         let countdown = 30;
//     }

//     wordValidator = (word) => {
//         // For a word two conditions must be met...
//         // let round = this.state.round not useful outside react
//         let wordString = word;
//         let boardIndices = [];
        
//         let usedIdx = [];
//         let wordBin = [];

//         let isInDictionary = false;
//         let isInBoard = false;
        
//         // The first condition is that the word must exist in a list of all english words
//         if(words.includes(word)) {
//             isInDictionary = true;
//         }
//         // next, we get the the number of occurances of the first tile in our board
//         for(let i in round) {
//             if(round[i] === word.slice(0, round[i].length).toUpperCase()){
//                 boardIndices.push(i);
//             }
//         }

//         //begin the recursion dive
//         startCrawl(boardIndices);

//         // if the entered word is on the board, in the dictionary and is at least 3 letters it is accepted
//         if(isInBoard && isInDictionary && word.length > 2){
//                 // if(!this.state.pWords.includes(word) ){
//                     pWords: this.state.pWords.push(word);
//                     this.handleScore(word);
//                 // }
//         }
//         // functions
//         function startCrawl(indices) {
//             for(let b of indices){
//                 crawlBoard(b, wordString)
//             }
//         }

//         //recursivly move through the board
//         function crawlBoard(idx, thisWord){
//             let nIdx = getNeighbors(idx);
//             let nLtrIdx = [];     
//             wordBin.push(thisWord.split('').shift());
//             thisWord = thisWord.slice(1);
//             if (thisWord.length === 0) { 
//                 return isInBoard = true };
//             for(let n of nIdx){
//                 if (round[n] === thisWord[0].toUpperCase() && !usedIdx.includes(n)) {
//                     nLtrIdx.push(n);
//                 };
//             }
//             if(nLtrIdx.length > 0){
//                 for(let n of nLtrIdx){  
//                     usedIdx.push(n);
//                     crawlBoard(n, thisWord);
//                 }
//             } else {
//                 usedIdx.pop()
//                 thisWord = wordBin.pop() + thisWord;
//             }
//             return false;
//         }
//         //get the neighbors based on the location of the current cell
//         function getNeighbors(index){
//             index = parseInt(index, 10);
//             let neighbors = [];
//             if (index === 5 || index === 6 || index === 9 || index === 10 ){
//                 neighbors.push((index-5),(index-4),(index-3),(index-1),(index+1),(index+3),(index+4),(index+5));
//             }
//             if (index === 1 || index === 2) {
//                 neighbors.push((index-1),(index+1),(index+4),(index+3),(index+5))
//             }
//             if(index === 14 || index === 13){
//                 neighbors.push((index-1),(index+1),(index-4),(index-3),(index-5));
//             }
//             if(index === 4 || index === 8){
//                 neighbors.push((index+1),(index+4),(index-4),(index+5),(index-3));
//             }
//             if(index === 11 || index === 7){
//                 neighbors.push((index-4),(index+4),(index-1),(index-5),(index+3));
//             }
//             if(index === 0){
//                 neighbors.push(1, 4, 5)
//             }
//             if(index === 3){
//                 neighbors.push(2, 3, 7)
//             }
//             if(index === 12){
//                 neighbors.push(8, 9, 13)
//             }
//             if(index === 15){
//                 neighbors.push(10, 11, 14)
//             }
//             return neighbors;
//         }

        
//     }
// }



// module.exports = GameLogic;