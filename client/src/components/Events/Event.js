import React, {Component} from "react";
import '../../styles/EventCard.css';

//Creating an event component to show event details

class Event extends Component { 
  
  render() {
    return (
      <div className="eventCard">
        <div className="imageCard">
          <div className="image">{this.props.specificEvent.banner}</div>
          <div className="title">{this.props.specificEvent.name}</div>
          <div className="desc">{this.props.specificEvent.description}</div>
          <div className="locationTime">{this.props.specificEvent.location} {this.props.specificEvent.date}</div>
        </div>
        <div className="society">
          <div className="iconNext"><div className="icon"></div></div>
        </div>
      </div>
    );
  }
}

export default Event;