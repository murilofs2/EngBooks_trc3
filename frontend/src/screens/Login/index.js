import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from "./LoginForm";

class LoginScreen extends Component {
    render() {
        return(
        <div className="main-login-container">
          <LoginForm />
        </div>
        );
    }
}

export default LoginScreen;



