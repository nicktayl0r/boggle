import React from 'react';
import './BoggleMatrix.css'


const BoggleMatrix = (props) => {
    return(
        <div className="BoggleMatrix">
            {
                props.round.map((letter, idx) => (
                    <div key={letter+idx}>
                        <span>{letter}</span>
                    </div>
                ))
            }

        </div>
    )

    
}

export default BoggleMatrix;