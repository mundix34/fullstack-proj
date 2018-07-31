import React, {Component} from 'react';
import logo from './communityBank.svg';
import './Login.css';
class Login extends Component {
    login(){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let url =`${window.location.origin}/auth/callback`
        window.location=`https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`

    }
    render() {
      return (
        <div className="App">
          <h1>Home Route</h1>
          <img src = {logo} alt = ''/>
          <button onClick = {this.login}> Login</button>
        </div>
      );
    }
  }
  
  export default Login;
  