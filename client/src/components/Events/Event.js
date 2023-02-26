import React, {Component} from "react";
import '../../styles/EventCard.css';

//Creating an event component to show event details

class Event extends Component { 
  render() {
    return (
      <div className="eventCard" data-testid = "eventCardID">
        <h3 className="eventName" data-testid = "eventNameID">{this.props.specificEvent.name}</h3>
        <p className="eventDescription" data-testid = "eventDescriptionID">{this.props.specificEvent.description}</p>
        <b><span className="eventDate" data-testid = "eventDateID">{this.props.specificEvent.date}</span></b>
        <b><span className="eventLocation" data-testid = "eventLocationID">{this.props.specificEvent.location}</span></b>
      </div>
    );
  }
}

export default Event;