import React, {Component} from "react";
import '../styles/EventCard.css';

//Creating an event component to show event details

class ExtendedEvent extends Component { 
  render() {
    return (
      <div className="eventCard">
        <h3 className="eventName">{this.props.specificEvent.name}</h3>
        <p className="eventDescription">{this.props.specificEvent.description}</p>
        <b><span className="eventDate">{this.props.specificEvent.date}</span></b>
        <b><span className="eventLocation">{this.props.specificEvent.location}</span></b>
        <ul>
          {this.props.ticketTypes.map(ticketType => (
            <li key={ticketType.id}>
              <span className="ticketType">{ticketType.ticketType}</span>
              <span className="ticketPrice">{ticketType.price}</span>
            </li>
          ))}
        </ul>
        <p>society name: {this.props.specificSociety.name}</p>
        <p>society description: {this.props.specificSociety.description}</p>
        <p>society email: {this.props.specificSociety.email}</p>
      </div>
    );
  }
}

export default ExtendedEvent;