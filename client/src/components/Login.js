
import React, { Component } from 'react';
import '../styles/Login.css';
const axios = require('axios');
const jwtController = require('../utils/jwt.js');



// Create a login component that prints the input email and password to the console
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginEmail: '',
            loginPassword: '',

            signupName: '',
            signupEmail: '',
            signupPassword: '',
            signupConfirmPassword: '',

            forgotEmail: '',

            resetPassword: '',
            resetConfirmPassword: '',

            //block of state variables relating to showing forms
            disableLoginForm: false,
            disableSignUp: true,
            disableForgotPassword: true,
            disablePopUpMessage: true,
            disableResetPassword: true,
            popUpMessage: ''
        };
    }
    
    // Update the state of variable associated with a field
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Submit login to backend to receive token for use
    handleSubmitLogin = (event) => {
        if (this.state.loginEmail === '' || this.state.loginPassword === '') {
            console.log('Empty Fields');
            this.showMessage('You have left a field empty');
        } 
        event.preventDefault();
        
        axios.post('https://localhost:5001/user/login', { email: this.state.loginEmail, password: this.state.loginPassword })
            .then(response => {
                if (response.data.token) {
                    jwtController.setToken(response.data.token);
                    window.location = '/';
                } else {
                    this.showMessage('Error: ' + response.data.message);
                }
            })
            .catch(error => {
                console.log(error.message);
                this.showMessage('Local Client Error: ' + error.message);
            });
    }

    // Submit signup to backend to receive successful sign up
    handleSubmitSignUp = (event) => {
        if (this.state.signupConfirmPassword !== this.state.signupPassword) {
            console.log('Passwords Do Not Match');
            this.showMessage('Passwords Do Not Match');
            this.signupToggle();
            return;
        } 


        event.preventDefault();
        
        axios.post('https://localhost:5001/user/signup', { name: this.state.signupName, email: this.state.signupEmail, password: this.state.signupPassword })
            .then(response => {
                this.showMessage('Signed Up. Check Email for Verification.');
            })
            .catch(error => {
                console.log(error);
                this.showMessage('Error: ' + error.message);
                this.signupToggle();
            });
        
    }

    // Submit forgot password to backend to receive successful forgot password email
    handleSubmitForgot = (event) => {
        event.preventDefault();
        
        axios.post('https://localhost:5001/user/forgotPassword', { email: this.state.forgotEmail })
            .then(response => {
                this.showMessage('Forgot Password Email Sent If Email Account Exists.');
            })
            .catch(error => {
                console.log(error.message);
                this.showMessage('Local Client Error: ' + error.message);
            });
        
    }

    // Submit a new password to be set
    handleSubmitResetPassword = (event) => {
        if (this.state.resetConfirmPassword !== this.state.resetPassword) {
            console.log('Passwords Do Not Match');
            this.showMessage('Passwords Do Not Match');
            this.resetPasswordToggle();
            return;
        } 
        
        event.preventDefault();

        const params = this.getPARAMS();
        
        axios.post('https://localhost:5001/user/reset', { verificationCode: params.get('forgot'), verificationType: 'forgotPassword', userId: parseInt(params.get('userId')), new_password: this.state.resetPassword })
            .then(response => {
                this.showMessage('Password Reset');
            })
            .catch(error => {
                console.log(error.message);
                this.showMessage('Local Client Error: ' + error.message);
            });
        
    }


    // Toggle the signup Form Viewable
    signupToggle = () => {
        this.setState({
            disableLoginForm: !this.state.disableLoginForm,
            disableSignUp: !this.state.disableSignUp
        });
    }

    // Toggle the Forgot Password Form Viewable
    forgotToggle = () => {
        this.setState({
            disableLoginForm: !this.state.disableLoginForm,
            disableForgotPassword: !this.state.disableForgotPassword
        });
    }

    // Toggle the Reset Password Form Viewable
    resetPasswordToggle = () => {
        this.setState({
            disableLoginForm: !this.state.disableLoginForm,
            disableResetPassword: !this.state.disableResetPassword
        });
    }

    // Open the Message Overlay
    showMessage = (message) => {
        this.setState({
            disablePopUpMessage: false,
            popUpMessage: message
        });
    }
    
    // Close the Message Overlay
    closeMessage = () => {
        this.setState({
            disablePopUpMessage: true,
            disableLoginForm: false,
            disableForgotPassword: true,
            disableSignUp: true,
            disableResetPassword: true
        });
    }

    loginNewUser = (param) => {
        axios.post('https://localhost:5001/user/verify', {verificationCode: param.get('verify'), verificationType: param.get('type'), userId: parseInt(param.get('userId'))})
        .then(res => {
            this.showMessage('Verified! Use Your Credentials To Log In!');
        })
        .catch(err => {
            console.log(err);
            this.showMessage('Error: ' + err);
        });
    }

    getPARAMS = () => {
        const params = new Map();
        window.location.search.substring(1).split('&').map(paramString => {
            let param = paramString.split('=');
            params.set(param[0], param[1]);

        });

        return params;
    }

    componentDidMount() {
        const params = this.getPARAMS();
        if (params.get('verify')) {
            this.loginNewUser(params);
        } else if (params.get('forgot')) {
            this.resetPasswordToggle();
        }
    }
    
    //Run On Render to check if link holds extra data
    
    render() {
        return (
            <div className='page-container'>
                <div className='underlay'></div>

                <div className="container" id='LoginForm' disabled={this.state.disableLoginForm}>
                    <h1>Log In</h1>
                        <div className='field' style={{height: '0.9em'}}>
                            <label className='buttonLabel' onClick={this.signupToggle}>Not A User? Sign Up</label><br />
                        </div>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="loginEmail" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="loginPassword" minLength="8" onChange={this.handleChange} required />
                        </div>
                        <div className='field' style={{textAlign: 'right', height: '0.9em', marginTop: 0, marginBottom: '10px'}}>
                            <label className='buttonLabel' onClick={this.forgotToggle}>Forgot Your Password?</label><br />
                        </div>
                        <button name="loginbutton" onClick={this.handleSubmitLogin}>Login</button>
                </div>

                <div className="container" id='SignUpForm' disabled={this.state.disableSignUp}>
                    <h1>Sign Up</h1>
                        <div className='field' style={{height: '0.9em'}}>
                            <label className='buttonLabel' onClick={this.signupToggle}>Already a User? Log In</label><br />
                        </div>
                        <div className='field'>
                            <label htmlFor="text">Name</label><br />
                            <input type="text" name="signupName" minLength="3" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="signupEmail" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="signupPassword" minLength="8" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="confirmPassword">Confirm Password</label><br />
                            <input type="password" name="signupConfirmPassword" onChange={this.handleChange} required />
                        </div>
                        <button name="signup-button" onClick={this.handleSubmitSignUp}>Sign Up</button>
                </div>

                <div className="container" id='forgotForm' disabled={this.state.disableForgotPassword}>
                    <h1>Forgot Password</h1>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="forgotEmail" onChange={this.handleChange} required />
                        </div>
                        <div className='field' style={{textAlign: 'right', height: '0.9em', marginTop: 0, marginBottom: '10px'}}>
                            <label className='buttonLabel' onClick={this.forgotToggle}>Remember Your Password?</label><br />
                        </div>
                        <button name="forgot-button" onClick={this.handleSubmitForgot}>Send Reset Password Email</button>
                </div>

                <div className="container" id='resetPasswordForm' disabled={this.state.disableResetPassword}>
                    <h1>Reset Password</h1>
                    <div className='field'>
                        <label htmlFor="password">Password</label><br />
                        <input type="password" name="resetPassword" minLength="8" onChange={this.handleChange} required />
                    </div>
                    <div className='field'>
                        <label htmlFor="confirmPassword">Confirm Password</label><br />
                        <input type="password" name="resetConfirmPassword" onChange={this.handleChange} required />
                    </div>
                    <button onClick={this.handleSubmitResetPassword} type="submit">Reset Password</button>
                </div>

                <div className='overlay' disabled={this.state.disablePopUpMessage}>
                    <div className='container' id='popupForm'>
                        <div className='field'>
                            <label style={{textAlign: 'center'}}>{this.state.popUpMessage}</label><br />
                        </div>
                        <button onClick={this.closeMessage} type="submit">Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;