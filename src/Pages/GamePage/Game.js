import React from 'react';
import GameBoard from '../../Components/GameBoard/GameBoard'
import PlayerFeed from '../../Components/PlayerFeed/PlayerFeed'
import './Game.css'


let diceArray = [
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
    
    componentDidMount (){
        let gameboard = diceArray.map(x => x[Math.floor(Math.random()*6)]);
        this.setState = ( this.state.round= gameboard )
        console.log(this.state.round)
    }

    roundTimer = () => {
        setTimeout(function(){
        }, 180000)
    }

    wordValidator = () => {

    }

    render(){
        return(
            <div>

                <h3><em>“A serious and good philosophical work could be written consisting entirely of games of Boggle...</em></h3>
                <span>-Ludwig Wittgenstein</span>
                <br/>
                <br/>
                <br/>

                <GameBoard 
                    round={this.state.round}

                />
                <PlayerFeed />
            </div>
        )
    }
}

export default Game;