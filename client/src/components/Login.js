
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
            return false;
        } 
        event.preventDefault();
        
        axios.post('http://localhost:5001/user/login', { email: this.state.loginEmail, password: this.state.loginPassword })
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
        return false;
    }

    // Submit signup to backend to receive successful sign up
    handleSubmitSignUp = (event) => {
        if (this.state.signupConfirmPassword === this.state.signupPassword) {
            console.log('Passwords Do Not Match');
            this.showMessage('You have left a field empty');
            this.signupToggle();
            return false;
        } 


        event.preventDefault();
        
        axios.post('http://localhost:5001/user/signup', { name: this.state.signupName, email: this.state.signupEmail, password: this.state.signupPassword })
            .then(response => {
                if (response.data.success) {
                    this.showMessage('Signed Up. Check Email for Verification.');
                } else {
                    this.showMessage('Error: ' + response.data.message);
                }
            })
            .catch(error => {
                console.log(error.message);
                this.showMessage('Local Client Error: ' + error.message);
            });
        
        return false;
    }

    // Submit forgot password to backend to receive successful forgot password email
    handleSubmitForgot = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:5001/user/forgotPassword', { email: this.state.forgotEmail })
            .then(response => {
                if (response.data.success) {
                    this.showMessage('Forgot Password Email Sent If Email Exists.');
                } else {
                    this.showMessage('Error: ' + response.data.message);
                }
            })
            .catch(error => {
                console.log(error.message);
                this.showMessage('Local Client Error: ' + error.message);
            });
        
        return false;
    }

    // Submit a new password to be set
    handleSubmitResetPassword = () => {


    //     if (this.state.confirmPassword === this.state.password) {
    //         console.log('Passwords Do Not Match');
    //         this.showMessage('You have left a field empty');
    //         signupToggle();
    //         return false;
    //     } 
    //     event.preventDefault();
        
    //     axios.post('http://localhost:5001/user/reset', { verificationCode: password: this.state.password })
    //         .then(response => {
    //             if (response.data.success) {
    //                 this.showMessage('Password Reset');
    //             } else {
    //                 showMessage('Error: ' + response.data.message);
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //             this.showMessage('Local Client Error: ' + error.message);
    //         });
        
    //     return false;
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
            disableSignUp: true
        });
        return false;
    }

    loginNewUser = () => {

    }
    
    //Run On Render to check if link holds extra data
    
    render() {
        return (
            <div className='page-container'>
                <div className='underlay'></div>

                <div className="container" id='LoginForm' disabled={this.state.disableLoginForm}>
                    <h1>Log In</h1>
                    <form onSubmit={this.handleSubmitLogin} action="#">
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
                        <button name="loginbutton" type="submit">Login</button>
                    </form>
                </div>

                <div className="container" id='SignUpForm' disabled={this.state.disableSignUp}>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmitSignUp} action="#">
                        <div className='field' style={{height: '0.9em'}}>
                            <label className='buttonLabel' onClick={this.signupToggle}>Already a User? Log In</label><br />
                        </div>
                        <div className='field'>
                            <label htmlFor="text">Name</label><br />
                            <input type="text" name="signupName" minLength="3" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="signup-email" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="signup-password" minLength="8" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="confirmPassword">Confirm Password</label><br />
                            <input type="password" name="signup-confirmPassword" onChange={this.handleChange} required />
                        </div>
                        <button name="signup-button" type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="container" id='forgotForm' disabled={this.state.disableForgotPassword}>
                    <h1>Forgot Password</h1>
                    <form onSubmit={this.handleSubmitForgot} action="#">
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="forgot-email" onChange={this.handleChange} required />
                        </div>
                        <div className='field' style={{textAlign: 'right', height: '0.9em', marginTop: 0, marginBottom: '10px'}}>
                            <label className='buttonLabel' onClick={this.forgotToggle}>Remember Your Password?</label><br />
                        </div>
                        <button name="forgot-button" type="submit">Send Reset Password Email</button>
                    </form>
                </div>

                <div className="container" id='resetPasswordForm' disabled={this.state.disableResetPassword}>
                    <h1>Reset Password</h1>
                    <form onSubmit={this.handleSubmitResetPassword} action="#">
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="password" minLength="8" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="confirmPassword">Confirm Password</label><br />
                            <input type="password" name="confirmPassword" onChange={this.handleChange} required />
                        </div>
                        <button type="submit">Reset Password</button>
                    </form>
                </div>

                <div className='overlay' disabled={this.state.disablePopUpMessage}>
                    <div className='container' id='popupForm'>
                        <form onSubmit={this.closeMessage} action="#">
                            <div className='field'>
                                <label style={{textAlign: 'center'}}>{this.state.popUpMessage}</label><br />
                            </div>
                            <button type="submit">Close</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
