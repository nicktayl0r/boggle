import React from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard'
import PlayerFeed from '../../Components/PlayerFeed/PlayerFeed'
import './Game.css';
import words from 'an-array-of-english-words';


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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            host: props.user,
            round: [],
            players: []
        }
    }

    newRound = () => {
        let inDice = dice.slice(0);
        let outDice =[];
        for (let i in inDice) {
            let randIndex = Math.floor(inDice.length*Math.random());
            outDice.push(inDice[randIndex]);
            inDice.splice(randIndex, 0);
        }
        let gameboard = outDice.map(x => x[Math.floor(Math.random()*6)]);
        this.setState({round: gameboard})
    }
    
    componentDidMount (){
        this.newRound();
    }

    roundTimer = () => {
        setTimeout(function(){
        }, 180000)
    }

    wordValidator = (word) => {
        // For a word two conditions must be met...
        let round = this.state.round
        let wordString = word;
        let boardIndices = [];
        
        let usedIdx = [];
        let wordBin = [];

        let isInDictionary = false;
        let isInBoard = false;
        
        // The first condition is that the word must exist in a list of all english words
        if(words.includes(word)) {
            isInDictionary = true;
        }
        // next, we get the the number of occurances of the first tile in our board
        for(let i in round) {
            if(round[i] === word.slice(0, round[i].length).toUpperCase()){
                boardIndices.push(i);
            }
        }

        startCrawl(boardIndices);

        function startCrawl(indices) {
            for(let b of indices){
                crawlBoard(b, wordString)
            }
        }
        function crawlBoard(idx, thisWord){
            let nIdx = getNeighbors(idx);
            let nLtrIdx = [];     
            wordBin.push(thisWord.split('').shift());
            thisWord = thisWord.slice(1);
            if (thisWord.length === 0) { 
                return isInBoard = true };
            for(let n of nIdx){
                if (round[n] === thisWord[0].toUpperCase() && !usedIdx.includes(n)) {
                    nLtrIdx.push(n);
                };
            }
            if(nLtrIdx.length > 0){
                for(let n of nLtrIdx){  
                    usedIdx.push(n);
                    crawlBoard(n, thisWord);
                }
            } else {
                usedIdx.pop()
                thisWord = wordBin.pop() + thisWord;
            }
            return false;
        }
            

            function getNeighbors(index){
                index = parseInt(index, 10);
                let neighbors = [];
                if (index === 5 || index === 6 || index === 9 || index === 10 ){
                    neighbors.push(index-5);
                    neighbors.push(index-4);
                    neighbors.push(index-3);
                    neighbors.push(index-1);
                    neighbors.push(index+1);
                    neighbors.push(index+3);
                    neighbors.push(index+4);
                    neighbors.push(index+5);
                }
                if (index === 1 || index === 2) {
                    neighbors.push(index-1)
                    neighbors.push(index+1)
                    neighbors.push(index+4)
                    neighbors.push(index+3)
                    neighbors.push(index+5)
                }
                if(index === 14 || index === 13){
                    neighbors.push(index-1)
                    neighbors.push(index+1)
                    neighbors.push(index-4)
                    neighbors.push(index-3)
                    neighbors.push(index-5)
                }
                if(index === 4 || index === 8){
                    neighbors.push(index+1);
                    neighbors.push(index+4);
                    neighbors.push(index-4);
                    neighbors.push(index+5);
                    neighbors.push(index-3);
                }
                if(index === 11 || index === 7){
                    neighbors.push(index-4);
                    neighbors.push(index+4);
                    neighbors.push(index-1);
                    neighbors.push(index-5);
                    neighbors.push(index+3);
                }
                if(index === 0){
                    neighbors.push(1, 4, 5)
                }
                if(index === 3){
                    neighbors.push(2, 3, 7)
                }
                if(index === 12){
                    neighbors.push(8, 9, 13)
                }
                if(index === 15){
                    neighbors.push(10, 11, 14)
                }
                return neighbors;
            }
            if(isInBoard && isInDictionary){
                alert('you savage ayye eff');
            }
            console.log(isInBoard);
            console.log(isInDictionary);
    }

    render(){
        return(
            <div>
                <h3><em>“A serious and good philosophical work could be written consisting entirely of games of Boggle..."</em></h3>
                <span>-Ludwig Wittgenstein</span>
                <br/>
                <br/>
                <GameBoard 
                    round={this.state.round}
                    newRound={this.newRound}
                    wordValidator={this.wordValidator}
                />
                <PlayerFeed />
            </div>
        )
    }
}

export default Game;