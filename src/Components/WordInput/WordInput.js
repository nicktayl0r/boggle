import React from 'react';
import './WordInput.css'

class WordInput extends React.Component {
    render(){
        return (
            <div className="WordInput">
                <div className="WordFeedback">
                    Enter a word, Bucko
                </div>
                <input type="text" placeholder="Enter an English word" ref="word"/>
                <button onClick={() => this.props.wordValidator(this.refs.word.value)}>Submit</button>
            </div>
        )
    }
};

export default WordInput;