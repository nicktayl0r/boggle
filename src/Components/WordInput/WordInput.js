import React from 'react';
import './WordInput.css'

class WordInput extends React.Component {

    componentDidMount(){
        if(this.props.timer === 0) {
            this.props.handleScore();
        }
    }

    render(){
        {
            if(this.props.countdown > 0 ){
                return (
                    <div className="WordInput">
                        <div className="WordFeedback">
                            You may enter a word, your score is {this.props.pScore}
                        </div>
                        <input type="text" placeholder="..." ref="word"/>
                        <button onClick={() => {this.props.wordValidator(this.refs.word.value); this.refs.word.value=''}}>Submit</button>
                    </div>
                )

            } else {
                return (
                    <div className="WordInput">
                        <div className="WordFeedback">
                            You scored: {this.props.pScore}
                        </div>
                        <input type="text" placeholder="Round Over" ref="word"/>
                        <button onClick={() => alert('You cant enter words anymore, you dingus')}>Submit</button>
                    </div>
                )
            }

        }
    }
};

export default WordInput;