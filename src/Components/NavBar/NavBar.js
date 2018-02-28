import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = (props) => {
    let nav = props.user ?
    <div>
        <Link to='' onClick={props.handleLogout} >Logout</Link>
        &nbsp;&nbsp;
        <span className="NavBar-welcome">Welcome, {props.user.name}</span>
    </div>
    :
    <div>
        <Link to='/login' >login</Link>
        &nbsp;&nbsp;
        <Link to='/signup'>signup</Link>
    </div>;

    return(
        <div>
            {nav}
        </div>
    );
};


export default NavBar;