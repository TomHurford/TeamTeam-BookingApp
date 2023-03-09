import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Events/Event';
import '../styles/Home.css';
import {getEvents} from "../utils/EventsLogic"

//Fetching events from the database and displaying them on the home page

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {eventCardList: []}
    }

    componentDidMount() {
        this.fetchData();
    }
    
    async fetchData() {
        const events = await getEvents();
        console.log(events);
        this.setState({eventCardList: this.eventsCardList(events)})
    }

    welcome() {
        return(
        <div className="welcome" data-testid = "welcome-message">
            <h1>Perfect Tickets? Perfect Time.</h1>
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

    handleClick= (eventId) => {
        window.location.href = '/event-details?eventId=' + eventId;
    }
}
export default Home
