
import React, { Component, useEffect } from 'react';
import '../../styles/orgManagement/OrganisationSignUp.css';
const axios = require('axios').default;


// Create a login component that prints the input email and password to the console
class OrganisationSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oraganisationName: '',
            oraganisationDesc: '',
            

            //block of state variables relating to showing forms
            disablePopUpMessage: true,
            popUpMessage: ''
        };
    }
    
    // Update the state of variable associated with a field
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Submit signup to backend to receive successful sign up
    handleSubmitSignUp = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:5001/societies/signup', { organisationName: this.state.organisationName })
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

    // Open the Message Overlay
    showMessage = (message) => {
        this.setState({
            disablePopUpMessage: false,
            popUpMessage: message
        });
    }
    
    // Close the Message Overlay
    closeMessage = (event) => {
        this.setState({
            disablePopUpMessage: true,
        });
        return false;
    }

    render() {
        return (
            <div>
                <div className='underlay'></div>

                <div className="container" id='SignUpForm' disabled={this.state.disableSignUp}>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmitSignUp} action="#">
                        <div className='field'>
                            <label htmlFor="text">Name Of Organisation</label><br />
                            <input type="text" name="oraganisationName" minLength="3" onChange={this.handleChange} required />
                        </div>
                        <div className='field'>
                            <label htmlFor="text">Description</label><br />
                            <input type="textarea" name="oraganisationDesc" minLength="10" onChange={this.handleChange} required />
                        </div>
                        <button type="submit">Sign Up</button>
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

export default OrganisationSignUp;
