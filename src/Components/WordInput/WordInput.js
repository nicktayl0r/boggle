import React from 'react';
import './WordInput.css'

const WordInput = (props) => {
    return (
        <div className="WordInput">
            <div className="WordFeedback">
                {/* //here you will be told if your word was successfully submitted */}
            </div>
            <input type="text" placeholder="Enter an English word"/>
            <button>Submit</button>
        </div>
    )
};

export default WordInput;