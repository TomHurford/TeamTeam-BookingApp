import React, {Component} from "react";
import '../../styles/EventCard.css';
import PropTypes from 'prop-types';

//Creating an event component to show event details
//Event society name needs to be fixed

class Event extends Component { 

  d = new Date(this.props.specificEvent.date);
  
  render() {
    return (
      <div className="innerEventCard" data-testid = "eventCardID">
        <div className="imageCard">
          <div className="image" data-testid = "eventImageID" style={{backgroundImage: `url(${this.props.specificEvent.banner})`}}></div>
          <div className="eventName" data-testid = "eventNameID">{this.props.specificEvent.name}</div>
          <div className="hiddenUntilHover">
          <div className="imageOverlay"></div>
            <div className="societyName">Society Name</div>
            <div className="eventDesc">{this.props.specificEvent.description}</div>
            <div className="locationTime">{this.props.specificEvent.location}<br />{this.d.toDateString()}</div>
          </div>
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