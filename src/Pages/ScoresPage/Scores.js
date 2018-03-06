import React from 'react';
import {Link} from 'react-router-dom';
import './Scores.css'

class Scores extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            scores: ['a', 'b']
        }
    }

    componentDidMount() {
        fetch('/api/scores/scores').then(res => res.json())
        .then(scores => {
            this.setState({scores})
        })
    }

    render(){
        const scoreList = this.state.scores.map((score, i) => (
            <div key={i}>
                {score}
            </div>
        ));
        return (
            <div className="Scores">
                <div><h1>Scores</h1></div>
                <div>
                    {scoreList}
                </div>
                <Link to="/">Home</Link>
            </div>
        )
    }
    
};

export default Scores;