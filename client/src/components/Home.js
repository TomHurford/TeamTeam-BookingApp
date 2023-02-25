import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Events/Event';
import '../styles/Home.css';
import {getEvents} from "../utils/events"

//Fetching events from the database and displaying them on the home page

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
        this.fetchData();
    }
    
    async fetchData() {
        const events = await getEvents();
        this.setState({data: events})
    }

    welcome() {
        return(
        <div className="welcome" data-testid = "welcome-message">
            <h1>Welcome to Ticketopia!</h1>
        </div>
        )
    }

    searchBar(){
        return(
           <form className="searchBar" data-testid = "search-bar">
                <input type="text" placeholder = "Search for events..."/>
           </form>
        )

    }

    render(){
        return(
            <div className='page-container'>
                <div className='underlay'></div>
                <div className="homePage" data-testid = "home-component">
                    {this.welcome()}
                    {this.searchBar()}
                    <ul className="events">
                        {console.log(this.state.data)}
                        {this.state.data.map(event => (    
                            <li key={event.id} onClick={()=>this.handleClick(event.id)} >
                            <Event details={event.id} specificEvent = {event}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

    handleClick= (eventId) => {
        window.location.href = '/event-details?eventId=' + eventId;
    }
}
export default Home
