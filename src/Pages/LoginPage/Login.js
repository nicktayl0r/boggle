import React from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';

const LoginPage = (props) => {
  return (
    <div>
      <LoginForm history={props.history} handleLogin={props.handleLogin}/>
    </div>
  );
};

export default LoginPage;