import React from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard'
import PlayerFeed from '../../Components/PlayerFeed/PlayerFeed'
import './Game.css';
import words from 'an-array-of-english-words';
import {userJoin, newRound} from './../../api';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            roundCount: 0,
            round: [],
            countdown: 0,
            pScore: 0,
            pWords: [],
            players: ['dean', 'jimmy']
        }   
    }


    handleScore(w) {
        console.log(w);
        switch(w.length) {
            case 3:
                this.setState({pScore: this.state.pScore+1});
                break;
            case 4:
                this.setState({pScore: this.state.pScore+1});
                break;
            case 5:
                this.setState({pScore: this.state.pScore+2});
                break;
            case 6:
                this.setState({pScore: this.state.pScore+3});
                break;
            case 7:
                this.setState({pScore: this.state.pScore+5});
                break;
            default:
                this.setState({pScore: this.state.pScore+11});   
        }
    }

    handleRound = (m, l) => {
        this.setState({round: m, countdown: l})
    }

    handleTick = () => {
        this.setState((c) => ({
            countdown: --c.countdown
        }));
    }
    // newRound = () => {
    //     socket.emit('make new round');
    //     socket.on('new round made', gameboard => {this.setState({round: gameboard}) });
    //     console.log(this.state.round)
    //     // let inDice = dice.slice(0);
    //     // let outDice =[];
    //     // while(inDice.length > 0) {
    //     //     let randIndex = Math.floor(inDice.length*Math.random());
    //     //     outDice.push(inDice[randIndex]);
    //     //     inDice.splice(randIndex, 1);
    //     // }
    //     // let gameboard = outDice.map(x => x[Math.floor(Math.random()*6)]);
    //     // this.setState({round: gameboard, countdown: 30})
    
    // }
    
    componentDidMount (){
        newRound(() => this.handleRound);
        userJoin(this.props.user);
        console.log("component has mounted!")
        console.log(this.state.round)
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
            console.log(round)
            if(round[i].toUpperCase() === word.slice(0, round[i].length).toUpperCase()){
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
            console.dir(idx);
            console.dir(thisWord);
            let nIdx = getNeighbors(idx);
            let nLtrIdx = [];

            console.log(wordBin);
            if (thisWord[0].toUpperCase() === 'Q') {
                wordBin.push(thisWord.substr(0, 2));
                thisWord = thisWord.slice(2);
            } else {
                wordBin.push(thisWord.split('').shift());
                thisWord = thisWord.slice(1);
            }

            console.log(thisWord)
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
            if(isInBoard && isInDictionary && word.length > 2){
                this.setState(() => {
                    if(!this.state.pWords.includes(word) ){
                        pWords: this.state.pWords.push(word);
                        this.handleScore(word);
                    }
                })
            }
    }

    render(){
        return(
            <div>
                <h3 className='vaporwave'><em>“A serious and good philosophical work could be written consisting entirely of games of Boggle..."</em></h3>
                <span>-Ludwig Wittgenstein</span>
                <br/>
                <br/>
                <h4>Its a game of boggle between {this.state.players[0]} and {this.state.players[1]}</h4>
                <br/>
                <br/>
                <GameBoard 
                    round={this.state.round}
                    newRound={() => newRound(this.handleRound)}
                    wordValidator={this.wordValidator}
                    countdown={this.state.countdown}
                    handleTick={this.handleTick}
                    pScore={this.state.pScore}
                    handleScore={this.state.score}
                />
                
            </div>
        )
    }
}

export default Game;