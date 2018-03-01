import React from 'react';
import BoggleMatrix from './../BoggleMatrix/BoggleMatrix';
import WordInput from './../WordInput/WordInput';
import Timer from './../Timer/Timer';
import './GameBoard.css'

const GameBoard = (props) => {
    return (
        <div className="GameBoard">
            <BoggleMatrix 
                round={props.round}
                newRound={props.newRound}
             />
            <WordInput 
                wordValidator={props.wordValidator}
                countdown={props.countdown}
                pScore={props.pScore}
                handleScore={props.handleScore}
            />
            <Timer
                handleTick={props.handleTick}
                countdown={props.countdown}
            />
        </div>
    )
};

export default GameBoard;