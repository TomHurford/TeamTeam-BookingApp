import React, {Component} from "react";
import '../../styles/EventCard.css';
import PropTypes from 'prop-types';

//Creating an event component to show event details

class Event extends Component { 
  
  render() {
    return (
      <div className="innerEventCard">
        <div className="imageCard">
          <div className="image" style={{backgroundImage: `url(${this.props.specificEvent.banner})`}}></div>
          <div className="eventName">{this.props.specificEvent.name}</div>
          <div className="hiddenUntilHover">
          <div className="imageOverlay"></div>
            <div className="eventDesc">{this.props.specificEvent.description}</div>
            <div className="locationTime">{this.props.specificEvent.location} {this.props.specificEvent.date}</div>
          </div>
        </div>
        <div className="society">
          <div className="societyName">Society Name</div>
          <div className="iconNext"><div className="icon"></div></div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  specificEvent: PropTypes.object,
  'specificEvent.name': PropTypes.string,
  'specificEvent.description': PropTypes.string,
  'specificEvent.date': PropTypes.string,
  'specificEvent.location': PropTypes.string
};
export default Event;