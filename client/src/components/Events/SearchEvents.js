import React from "react";
const axios = require('axios').default;
import Event from "./Event";
import "../../styles/TitleOfPage.css"
import "../../styles/Home.css"

class SearchEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    }; 
    this.fetchDataOnLoad(); 
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  fetchDataOnLoad = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventName = await String(searchParams.get('name'));
    this.setState({query: eventName})
    const events = await this.getEventsByName(eventName);
    this.setState({results: events})
  }

getEventsByName  = async (eventName) => {
    if(eventName === ""){
      return [];
    }
    else{
      try{
        const response = await axios.post('http://localhost:5001/events/search', {name: eventName});
        const event = await response.data;
        const events = await event.event;
        return events;
      } catch (error) {
        return null;
      }
    }
  }


  render() {
    return (
      <div className="title">
          <input
            className="searchBar"
            data-testid="search-bar"
            type="text"
            placeholder="Search for events..."
            value={this.state.query}
            onChange={this.handleChange}
            onKeyDown = {(e) => { if (e.key === 'Enter') { this.newSearch(this.state.query) }}}
          />

          <div className="events" data-testid="events-list">
            {this.state.results.map(event => (    
                <div className="eventCard" key={event.id} onClick={()=>this.handleClick(event.id)} >
                <Event details={event.id} specificEvent = {event}/>
                </div>
            ))}
          </div>
      </div>
    );
  }

  handleClick= (eventId) => {
    window.location.href = '/event-details?eventId=' + eventId;
}

 newSearch = (eventName) => {
    window.location.href = '/search-events?name=' + eventName;
  }
}

export default SearchEvents;