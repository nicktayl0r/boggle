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
        let boardIndices = [];
        let isInBoard = false;
        let isInDictionary = false;
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
        function crawl(index){
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
                neighbors.push(1)
                neighbors.push(4)
                neighbors.push(5)
            }
            if(index === 3){
                neighbors.push(2)
                neighbors.push(3)
                neighbors.push(7)
            }
            if(index === 12){
                neighbors.push(8)
                neighbors.push(9)
                neighbors.push(13)
            }
            if(index === 15){
                neighbors.push(10)
                neighbors.push(11)
                neighbors.push(14)
            }
            return neighbors;
        }
        // now we crawl recursivly for each instance of the first letter, being mindful of the 'Qu' tiles
        for(let i in boardIndices){
            let neighbors = crawl(parseInt(boardIndices[i], 10));
            
            
            
            

        }

        if (isInBoard && isInDictionary) {
            alert('this is a valid entry')
        }
        
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