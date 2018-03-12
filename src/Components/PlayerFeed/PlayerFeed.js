import React from 'react';
import './PlayerFeed.css'

const PlayerFeed = (props) => {
    let words = props.pWords.map((word) => { return
        <div>
            {word}
        </div>
    })
    return (
        <div className="PlayerFeed">
            this is the playerfeed: see the words here
            {props.pWords}
        </div>
    )
};

export default PlayerFeed;