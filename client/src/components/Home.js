import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Event';
import '../styles/Home.css';
import SearchBar from "./SearchBar";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }
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
            <br/>
            <h1>Welcome to Ticketopia!</h1>
            <p>Here you can find all the events you want to attend!</p>
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
                    <Event key={event.id} specificEvent = {event}></Event>
                ))}
            </ul>
            </div>
        )
    }
}
export default Home
