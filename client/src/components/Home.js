import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Events/Event';
import '../styles/Home.css';
import {getEvents} from "../utils/EventsLogic"

 

// This is used for fetching events from the database and displaying them on the home page. This component is used in the App component.

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {eventCardList: [], data: [],  query: ""}
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChange(event) {
        this.setState({ query: event.target.value });
    }
    
    async fetchData() {
        const events = await getEvents();
        this.setState({eventCardList: this.eventsCardList(events)})
    }
    // Message displayed on the home page
    welcome() {
        return(
        <div className="welcome" data-testid = "welcome-message">
            <h1>Perfect Tickets? Perfect Time.</h1>
        </div>
        )
    }
    // Search bar for searching events
    searchBar(){
        return(
            <div className="searchBarContainer">
            <input 
            className="searchBar"
            data-testid="search-bar"
            type="text" 
            placeholder = "Search for events..."
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown = {(e) => { if (e.key === 'Enter') { this.newSearch(this.state.query) }}}
            />
            </div>
        )

    }
    // Displaying the events on the home page
    eventsCardList(events) {
        return (
            <div className="events" data-testid="events-list">
                {events.map(event => (
                    <div className="eventCard" key={event.id} onClick={()=>this.handleClick(event.id)} >
                    <Event details={event.id} specificEvent = {event}/>
                    </div>
                ))}
            </div>
        );
    }

    render(){
        return(
            <div className='page-container'>
                <div className='underlay'></div>
                <div className="homePage" data-testid = "home-component">
                    {this.welcome()}
                    {this.searchBar()}
                    {this.state.eventCardList}
                </div>
            </div>
        )
    }
    // When an event is clicked, the user is redirected to that event's details page
    handleClick= (eventId) => {
        window.location.href = '/event-details?eventId=' + eventId;
    }

    newSearch = (eventName) => {
        window.location.href = '/search-events?name=' + eventName;
    }
}
export default Home