import React from 'react';
import './BoggleMatrix.css'


const BoggleMatrix = (props) => {
    
    return(
        <div>
            <div className="BoggleMatrix">
                {
                    props.round.map((letter, idx) => (
                        <div className="vaporwave" key={letter+idx}>
                            <span>{letter}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )

    
}

export default BoggleMatrix;