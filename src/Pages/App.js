import React from 'react';
import './App.css'

class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            fizz: "buzz"
        }
    }
    
    render() {
        return (

            <div>
                <h1>Lets Play Boggle</h1>
                <h2>Login</h2>
                <h2>Signup</h2>
                <div className="BoggleMenu">
                    <div>Create Game</div>
                    <div>Join Game</div>
                    <div>High Scores</div>
                    <div>How to Play</div>
                </div>

            </div>

        )
    }
}

export default App;