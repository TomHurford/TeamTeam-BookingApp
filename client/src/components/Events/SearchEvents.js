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
    console.log("getEventsByName");
    console.log(eventName);
    if(this.state.query === "" && eventName === undefined){
      console.log("getEventsByName Outer if");
      return [];
    }
    else{
      var event_name;
      if(eventName !== undefined){
        console.log("getEventsByName if");
        event_name = eventName;
      }
      else{
        console.log("getEventsByName else");
        event_name = this.state.query;
      }
      try{
        console.log("getEventsByName try");
        console.log(this.state.query);
        const response = await axios.post('http://localhost:5001/events/search', {name: event_name});
        const event = await response.data;
        const events = await event.event;
        console.log(await event);
        return events;
      } catch (error) {
        return null;
      }
    }
  }

async fetchData() {
    const events = await this.getEventsByName();
    this.setState({results: events})
  } 


  render() {
    return (
      <div className="title">
          <input
            className="searchBar"
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