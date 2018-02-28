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
            />
            <Timer />
        </div>
    )
};

export default GameBoard;