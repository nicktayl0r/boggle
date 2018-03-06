import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import Rules from '../Modals/Rules';
import NavBar from './../../Components/NavBar/NavBar';
import './Home.css'

const Home = (props) => {
    return (
        <div>
            <div className="Title">
                <div className="vaporWave">🅱</div>
                <div className="vaporWave">🅾</div>
                <div className="vaporWave">🅶</div>
                <div className="vaporWave">🅶</div>
                <div className="vaporWave">🅻</div>
                <div className="vaporWave">🅴</div>   
            </div>
        <div className="BoggleMenu">
            <div className="Home">
                <NavBar 
                    user={props.user}
                    handleLogout={props.handleLogout}
                />
            </div>
            <div className="Home"><Link to='/game'>Play Boggle</Link></div>
            <div className="Home"><Link to="/scores">High Scores</Link></div>
            <div className="Home" onClick={props.handleOpenModal}><div>How to Play</div></div>
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