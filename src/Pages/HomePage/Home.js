import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Rules from '../Modals/Rules';
import './Home.css'

import NavBar from './../../Components/NavBar/NavBar';

const Home = (props) => {
    return (
        <div>
        <h1>🅱🅾🅶🅶🅻🅴</h1>
        <h4><em>"No man is hurt but by Boggle.</em></h4>
        <h5>-Diogenes of Sinope</h5>
        
        <NavBar 
            user={props.user}
            handleLogout={props.handleLogout}
        />
        <div className="BoggleMenu">
            <div className="Home"><Link to='/game'>Play Boggle</Link></div>
            <div className="Home">Thesaurus</div>
            <div className="Home"><Link to="/scores">High Scores</Link></div>
            <div className="Home" onClick={props.handleOpenModal}>How to Play</div>
            <Modal
            isOpen={props.showModal}
            contentLabel="Rules of Boggle"
            >
                <button onClick={props.handleCloseModal}>Close</button>
                <br/>
                <Rules />
            </Modal>
        </div>
        </div>
    )
}

export default Home