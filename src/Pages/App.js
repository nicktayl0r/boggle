import React from 'react';
import render from 'react-router'
class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            fizz: "buzz"
        }
    }
    
    render() {
        return (
            <div>Wilkommen</div>
        )
    }
}

export default App;