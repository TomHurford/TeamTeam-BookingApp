import React, {Component} from "react";
import '../styles/EventCard.css';

//Creating an event component to show event details

class Event extends Component { 
  render() {
    return (
      <div className="eventCard">
        <h3 className="eventName">{this.props.specificEvent.name}</h3>
        <p className="eventDescription">{this.props.specificEvent.description}</p>
        <b><span className="eventDate">{this.props.specificEvent.date}</span></b>
        <b><span className="eventLocation">{this.props.specificEvent.location}</span></b>
      </div>
    );
  }
}

export default Event;