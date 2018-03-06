import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import userService from '../../utils/userService';
import Home from '../HomePage/Home';
import Signup from '../SignupPage/Signup';
import Login from '../LoginPage/Login';
import Scores from '../ScoresPage/Scores';
import Game from '../GamePage/Game';



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleSignup = () => {
        this.setState({user: userService.getUser()})
    }
    
    handleLogin = () => {
        this.setState({user: userService.getUser()})
    }

    handleLogout = () => {
        userService.logout();
        this.setState({user: null});
    }
    
    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    componentDidMount () {
        let user = userService.getUser();
        this.setState({user});
    }

    handleLogout = () => {
        userService.logout();
        this.setState({user: null});
    }

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/' render={() =>
                            <Home 
                            handleCloseModal={this.handleCloseModal}
                            handleOpenModal={this.handleOpenModal}
                            showModal={this.state.showModal}
                            user={this.state.user}
                            handleLogout={this.handleLogout}
                            timestamp={this.state.timestamp}
                            />
                        } />
                        <Route exact path='/signup' render={(props) =>
                            <Signup 
                            {...props}
                            handleSignup={this.handleSignup}
                            /> 
                        } />
                        <Route exact path='/login'render={(props) =>
                            <Login 
                            {...props}
                            handleLogin={this.handleLogin}
                            />
                        } />
                        <Route exact path='/scores' render={() =>
                            <Scores />
                        } />
                        <Route exact path='/game' render={() =>
                            <Game user={this.state.user} />
                        } />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;