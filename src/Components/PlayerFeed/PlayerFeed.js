import React from 'react';
import './PlayerFeed.css'

// this component returns the words a player has entered
const PlayerFeed = (props) => {
    let words = props.pWords.map((word) => { 
        return (
            <div key={word}>
                {word}
            </div>
        )
    })
    return (
        <div className="PlayerFeed">
            {words}
        </div>
    )
};

export default PlayerFeed;