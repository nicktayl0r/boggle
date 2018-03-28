import React from 'react';
import './PlayerFeed.css'

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