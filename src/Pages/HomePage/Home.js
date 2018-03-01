import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Rules from '../Modals/Rules';

import NavBar from './../../Components/NavBar/NavBar';

const Home = (props) => {
    return (
        <div>
        <h1>Boggle? Boggle!</h1>
        
        <h4><em>"No man is hurt but by Boggle.</em></h4>
        <h5>-Diogenes of Sinope</h5>
        
        <NavBar 
            user={props.user}
            handleLogout={props.handleLogout}
        />
        <div className="BoggleMenu">
            <div><Link to='/game'>Create Game</Link></div>
            <div>Join Game ~~TBD </div>
            <div><Link to="/scores">High Scores</Link></div>
            <div onClick={props.handleOpenModal}>How to Play</div>
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