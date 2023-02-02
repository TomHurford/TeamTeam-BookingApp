
import React, { Component } from 'react';

// Create a login component that prints the input email and password to the console
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    
    // Update the state when the user types in the email and password fields
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Print the email and password to the console when the user clicks the login button
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={this.handleChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;