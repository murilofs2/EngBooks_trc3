import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SignInForm from "../Signup/SignInForm";

class SignupScreen extends Component {
    render() {
        return(
        <div className="main-signIn-container">
          <SignInForm />
        </div>
        );
    }
}

export default SignupScreen;