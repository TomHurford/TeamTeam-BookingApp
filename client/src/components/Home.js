import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Event';
import '../styles/Home.css';
import SearchBar from "./SearchBar";

//Fetching events from the database and displaying them on the home page

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
        this.fetchData();
    }
    
    fetchData() {
        fetch('http://localhost:5001/events')
        .then(response => response.json())
        .then(eventsList => {this.setState({data: eventsList})})
        .catch(error => console.error(error))
    }

    welcome() {
        return(
        <div className="welcome">
            <h1>Welcome to Ticketopia!</h1>
            <SearchBar/>
        </div>
        )
    }

    render(){
        return(
            <div className="homePage">
            {this.welcome()}
            <ul className="events">
                {this.state.data.map(event => (
                    <li key={event.id} onClick={()=>console.log("Clickable")} >
                    <Event specificEvent = {event}/>
                    </li>
                ))}
            </ul>
            </div>
        )
    }
}
export default Home
