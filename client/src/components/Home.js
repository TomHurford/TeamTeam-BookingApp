import React, {Component} from "react";
import '../styles/Events.css';
import Event from './Events/Event';
import '../styles/Home.css';

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
        .then(eventsList => {this.setState({data: eventsList.events})})
        .catch(error => console.error(error))
    }

    welcome() {
        return(
        <div className="welcome">
            <h1>Welcome to Ticketopia!</h1>
        </div>
        )
    }

    searchBar(){
        return(
           <form className="searchBar">
                <input type="text" placeholder = "Search for events..."/>
           </form>
        )

    }

    render(){
        return(
            <div className='page-container'>
                <div className='underlay'></div>
                <div className="homePage">
                    {this.welcome()}
                    {this.searchBar()}
                    <ul className="events">
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
