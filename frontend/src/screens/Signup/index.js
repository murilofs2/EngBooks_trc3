import React, { Component } from 'react';
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