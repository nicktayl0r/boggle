import React from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard';
import PlayerFeed from '../../Components/PlayerFeed/PlayerFeed';
import Modal from 'react-modal';
import GameOver from './../Modals/GameOver';
import words from 'an-array-of-english-words';
import './Game.css';
import {Link} from 'react-router-dom';
import {userJoin, newRound, startGame, endGame} from './../../api';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            round: [],
            countdown: -1,
            pScore: 0,
            pWords: [],
            players: [],
            users: [props.user.name],
            showModal: false,
            winState: 0
        }
        startGame(this.handleGame);
        userJoin(this.state.users[0], this.getUsers);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal() {
        this.setState({ showModal: true });
    }
    
    handleCloseModal() {
        this.setState({ showModal: false });
    }
    
    handleGameOver = (c) => {
        if(!c.gameScores.includes(null) &&  c !== 0){
            console.log(c)
            this.setState({ winState: JSON.stringify(c)})
        }   
    }

    handleGame = (obj) =>{
        let players = [];
        players.push(obj['players'][0]['user'])
        players.push(obj['players'][1]['user'])
        this.setState({
            isActive: true,
            round: obj['round'],
            players: players,
            countdown: 20,
        })
    }    

    handleScore(w) {
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

    getUsers = (users) => {
        this.setState({players: JSON.stringify(users)})
    }

    handleRound = (m, l) => {
        this.setState({countdown: 240})
    }

    handleTick = () => {
        this.setState((c) => ({
            countdown: --c.countdown
        }));
        let pIndex = this.state.players.indexOf(this.state.users[0]);
        if(this.state.countdown === 0){
            endGame(this.handleGameOver, this.state.pScore, this.state.pWords, pIndex)
            this.handleOpenModal();
        }
    }
    
    componentDidMount() {
        console.log("component has mounted!");
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
            let nIdx = getNeighbors(idx);
            let nLtrIdx = [];
            if (thisWord[0].toUpperCase() === 'Q') {
                wordBin.push(thisWord.substr(0, 2));
                thisWord = thisWord.slice(2);
            } else {
                wordBin.push(thisWord.split('').shift());
                thisWord = thisWord.slice(1);
            }
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
        {
            if(this.state.isActive){
                return(
                    <div>
                        <h3 className='vaporwave'><em>“A serious and good philosophical work could be written consisting entirely of games of Boggle..."</em></h3>
                        <span>-Ludwig Wittgenstein</span>
                        <br/>
                        <h3>Boggle Time!</h3>
                        <h4>{this.state.users}</h4>
                        <h4> {this.state.players[0]} vs. {this.state.players[1]}</h4>
                        <br/>
                    <GameBoard
                            round={this.state.round}
                            newRound={() => this.newRound(this.handleRound)}
                            wordValidator={this.wordValidator}
                            countdown={this.state.countdown}
                            handleTick={this.handleTick}
                            pScore={this.state.pScore}
                            handleScore={this.state.score}
                        />
                        <Modal
                            isOpen={this.state.showModal}
                            contentLabel="Game Over Message"
                            >
                            <button onClick={this.handleCloseModal}>Close</button>
                            <br/>
                            <GameOver winState={this.state.winState}
                                      user={this.state.users}
                                      players={this.state.players}
                            />
                        </Modal>
                    </div>
                )
            } else {
                return(
                    <div>
                        <div>
                            <h1 className="vaporwave">Users in Queue</h1>
                        </div>
                        Please wait for another player...
                    </div>
                )
            }
        }
    }
}

export default Game;