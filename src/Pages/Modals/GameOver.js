import React from 'react';
import './Modals.css';
import {Link} from 'react-router-dom';

const GameOver = (props) => {
    let players = props.players;
    let user = props.user;
    let gameOutcome = JSON.parse(props.winState);
    let userIndex = players.indexOf(user[0]);
    console.log(gameOutcome)
    console.log(user);
    console.log(userIndex);
    console.log(players);
    
    
    {
        if(gameOutcome !== 0 && gameOutcome.gameScores[0] === gameOutcome.gameScores[1] ){
            return (
                <div className="Rules">
                <h1>A tie? Inconceivable!</h1>
                <p> Let's settle this with a game of Boggle.</p>
                <br/>
                <table>
                    <tr>
                                <th>Player</th> |
                                <th>Score</th> |
                                <th>Words</th>
                            </tr>
                    <tr>
                                <td>{players[0]}</td>
                                <td>{gameOutcome.gameScores[0]}</td>
                                <td>{gameOutcome.gameWords[0]}</td>
                            </tr>
                            <tr>
                                <td>{players[1]}</td>
                                <td>{gameOutcome.gameScores[1]}</td>
                                <td>{gameOutcome.gameWords[1]}</td>
                            </tr>
                    
                </table>
                
                <Link to="/scores"><button >Visit Leaderboard</button></Link>
            </div>
            )
        } else if( gameOutcome !== 0 && gameOutcome.gameScores[userIndex] !== Math.max(...gameOutcome.gameScores)) {
            return(
                <div className="Rules">
                    <h1>Mediocre!</h1>
                    <p> You lost to x! How about another round?</p>
                    <br/>
                    <table>
                        
                            <tr>
                                <th>Player</th> |
                                <th>Score</th> |
                                <th>Words</th>
                            </tr>
                            <tr>
                                <td>{players[0]}</td>
                                <td>{gameOutcome.gameScores[0]}</td>
                                <td>{gameOutcome.gameWords[0]}</td>
                            </tr>
                            <tr>
                                <td>{players[1]}</td>
                                <td>{gameOutcome.gameScores[1]}</td>
                                <td>{gameOutcome.gameWords[1]}</td>
                            </tr>
                        
                    </table>
                    
                    <Link to="/scores"><button >Visit Leaderboard</button></Link>
                </div>
            )  
        } else if(gameOutcome !== 0 && gameOutcome.gameScores[userIndex] === Math.max(...gameOutcome.gameScores)){
            return(
              
                <div className="Rules">
                    <h1>Well Done</h1>
                    <p>You destroyed x! Why not relive the glory?</p>
                    <br/>
                    <table>
                        
                            <tr>
                                <th>Player</th> |
                                <th>Score</th> |
                                <th>Words</th>
                            </tr>
                        <tr>
                                <td>{players[0]}</td>
                                <td>{gameOutcome.gameScores[0]}</td>
                                <td>{gameOutcome.gameWords[0]}</td>
                            </tr>
                            <tr>
                                <td>{players[1]}</td>
                                <td>{gameOutcome.gameScores[1]}</td>
                                <td>{gameOutcome.gameWords[1].join(', ')}</td>
                            </tr>
                        
                    </table>
                    
                    <Link to="/scores"><button >Visit Leaderboard</button></Link>
                </div>
            )
        } else {
            return (
                <div>
                    Hey bro whats up
                </div>
            )
        }
    }
}

export default GameOver;