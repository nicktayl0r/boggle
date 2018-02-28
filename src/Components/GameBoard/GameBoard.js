import React from 'react';
import BoggleMatrix from './../BoggleMatrix/BoggleMatrix';
import WordInput from './../WordInput/WordInput';
import Timer from './../Timer/Timer';

const GameBoard = (props) => {
    return (
        <div>
            <BoggleMatrix round={props.round} />
            <WordInput />
            <Timer />
        </div>
    )
};

export default GameBoard;