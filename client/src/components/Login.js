
import React, { Component } from 'react';
import '../styles/Login.css';
import axios from 'axios';

// Create a login component that prints the input email and password to the console
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            disableLoginForm: false,
            disableSignUp: true,
            disableForgotPassword: true,
            disablePopUpMessage: true,
            popUpMessage: ''
        };
    }
    
    // Update the state when the user types in the email and password (or other) fields
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Print the email and password to the console when the user clicks the login button
    handleSubmitLogin = (event) => {
        if (this.state.username == '' || this.state.password == '') {
            console.log('Empty Fields')
            
            this.setState({
                disablePopUpMessage: false,
                popUpMessage: 'You have left a field empty'
            });
        }
        event.preventDefault();
        console.log(this.state);
        axios.post('https://localhost:5001/user/login', { username: this.state.email, password: this.state.password })
            .then(response => {
                console.log(response.data.token);
            })
            .catch(error => {
                console.log(error.message);
            });
        return false;
    }

    // Print the email, password and cpassword to the console when the user clicks the Sign Up button
    handleSubmitSignUp = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.showMessage('Signed Up. Check Email for Verification.');
        return false;
    }

    // Print the email to the console when the user clicks the forgot button
    handleSubmitForgot = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.showMessage('Forgot Password Email Sent If Email Exists.');
        return false;
    }



    signupToggle = (event) => {
        this.setState({
            disableLoginForm: !this.state.disableLoginForm,
            disableSignUp: !this.state.disableSignUp
        });
    }

    forgotToggle = (event) => {
        this.setState({
            disableLoginForm: !this.state.disableLoginForm,
            disableForgotPassword: !this.state.disableForgotPassword
        });
    }

    showMessage = (message) => {
        this.setState({
            disablePopUpMessage: false,
            popUpMessage: message
        });
    }
    closeMessage = (event) => {
        this.setState({
            disablePopUpMessage: true,
            disableLoginForm: false,
            disableForgotPassword: true,
            disableSignUp: true
        });
        return false;
    }

    // login(email=this.state.email, password=this.state.password) {
    //     console.log('test');
    //     fetch('https://localhost:5001/login',{'email':email,'password':password})
    //     .then((res) => {
    //         console.log(res);

    //     }).catch((err) => console.log(err));
    // }

    render() {
        return (
            <div>
                <div className='underlay'></div>

                <div className="container" id='LoginForm' disabled={this.state.disableLoginForm}>
                    <h1>Log In</h1>
                    <form onSubmit={this.handleSubmitLogin} action="#">
                        <div className='field' style={{height: '0.9em'}}>
                            <label className='buttonLabel' onClick={this.signupToggle}>Not A User? Sign Up</label><br />
                        </div>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="email" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="password" onChange={this.handleChange} required />
                        </div>
                        <div className='field' style={{textAlign: 'right', height: '0.9em', marginTop: 0, marginBottom: '10px'}}>
                            <label className='buttonLabel' onClick={this.forgotToggle}>Forgot Your Password?</label><br />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>

                <div className="container" id='SignUpForm' disabled={this.state.disableSignUp}>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmitSignUp} action="#">
                        <div className='field' style={{height: '0.9em'}}>
                            <label className='buttonLabel' onClick={this.signupToggle}>Already a User? Log In</label><br />
                        </div>
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="email" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label><br />
                            <input type="password" name="password" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="confirmPassword">Confirm Password</label><br />
                            <input type="password" name="confirmPassword" onChange={this.handleChange} required />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="container" id='forgotForm' disabled={this.state.disableForgotPassword}>
                    <h1>Forgot Password</h1>
                    <form onSubmit={this.handleSubmitForgot} action="#">
                        <div className='field'>
                            <label htmlFor="email">Email</label><br />
                            <input type="email" name="email" onChange={this.handleChange} required />
                        </div>
                        <div className='field' style={{textAlign: 'right', height: '0.9em', marginTop: 0, marginBottom: '10px'}}>
                            <label className='buttonLabel' onClick={this.forgotToggle}>Remember Your Password?</label><br />
                        </div>
                        <button type="submit">Send Reset Password Email</button>
                    </form>
                </div>

                <div className='overlay' disabled={this.state.disablePopUpMessage}>
                    <div className='container' id='popupForm'>
                        <h1></h1>
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
