import React from "react";
const axios = require('axios').default;

class SearchEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

getEventsByName  = async () => {
    console.log("getEventsByName");
    try{
      console.log("getEventsByName try");
      console.log(this.state.query);
      const response = await axios.post('http://localhost:5001/events/search', {name: this.state.query});
      const event = await response.data;
      console.log(await event);
      return event;
    } catch (error) {
      return null;
    }
  }

async fetchData() {
    const events = await this.getEventsByName();
    this.setState({results: events.data})
  } 


  render() {
    return (
      <div className="searchEvents">
        <h1>Search Events</h1>
        <h1>Search Events</h1>
        <h1>Search Events</h1>
        <h1>Search Events</h1>
        <h1>Search Events</h1>
        <h1>Search Events</h1>

          <input
            type="text"
            placeholder="Search for events..."
            value={this.state.query}
            onChange={this.handleChange}
          />
          <button onClick={()=> this.fetchData()}>Search</button>

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
}

export default SearchEvents;