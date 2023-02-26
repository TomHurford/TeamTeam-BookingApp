import React, {Component} from "react";
import '../../styles/EventCard.css';
import PropTypes from 'prop-types';

//Creating an event component to show event details
//Event society name needs to be fixed

class Event extends Component { 
  
  render() {
    return (
      <div className="innerEventCard" data-testid = "eventCardID">
        <div className="imageCard">
          <div className="image" data-testid = "eventImageID" style={{backgroundImage: `url(${this.props.specificEvent.banner})`}}></div>
          <div className="eventName" data-testid = "eventNameID">{this.props.specificEvent.name}</div>
          <div className="hiddenUntilHover">
          <div className="imageOverlay"></div>
            <div className="eventDesc" data-testid = "eventDescriptionID">{this.props.specificEvent.description}</div>
            <div className="locationTime" data-testid = "eventLocationTimeID">{this.props.specificEvent.location} {this.props.specificEvent.date}</div>
          </div>
        </div>
        <div className="society">
          <div className="societyName" data-testid = "eventSocietyNameID">Society Name</div> 
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