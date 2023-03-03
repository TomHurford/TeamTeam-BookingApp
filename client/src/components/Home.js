import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Events/Event';
import '../styles/Home.css';
import {getEvents} from "../utils/EventsLogic"

//Fetching events from the database and displaying them on the home page

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [],  query: ""}
        this.fetchData();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
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
            <input 
            className="searchBar"
            type="text" 
            placeholder = "Search for events..."
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown = {(e) => { if (e.key === 'Enter') { this.newSearch(this.state.query) }}}
            />
        )

    }

    render(){
        return(
            <div className='page-container'>
                <div className='underlay'></div>
                <div className="homePage" data-testid = "home-component">
                    {this.welcome()}
                    {this.searchBar()}
                    <div className="events" data-testid="events-list">
                        {console.log(this.state.data)}
                        {this.state.data.map(event => (    
                            <div className="eventCard" key={event.id} onClick={()=>this.handleClick(event.id)} >
                            <Event details={event.id} specificEvent = {event}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    handleClick= (eventId) => {
        window.location.href = '/event-details?eventId=' + eventId;
    }

    newSearch = (eventName) => {
        window.location.href = '/search-events?name=' + eventName;
    }
}
export default Home
