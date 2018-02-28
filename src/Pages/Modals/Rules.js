import React from 'react';
import './Modals.css';

const Rules = () => {
    return(
        <div className="Rules">
            <h1>How to Play</h1>
            <blockquote>
                <em>'Freedom is nothing but a chance to play boggle'</em> - Albert Camus
            </blockquote>
            <div>To win Boggle you must score the most points over a predetermined number of rounds, with each round being 3 minutes long. Points are given based on the length of each submitted word.</div>
            <br/>
            <div>You may not enter the same word twice and you can only use the same letter tile once. Words must be at least 3 characters long.</div>
            <br/>
            <div>Words within words are permitted. Words must be formed from adjacent letters.</div>
            <br/>
            <div>The table below gives the points awarded per word by length.</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <th>Points</th>
                        <th>Letters</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>11</td>
                        <td>8 or more</td>
                    </tr>

                </tbody>
            </table>

        </div>
    )
}

export default Rules;