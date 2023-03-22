import React, {Component} from "react";
import '../../styles/EventCard.css';
import PropTypes from 'prop-types';

// This component is used to display the event cards on the home page and the events page.
// It is used in the Events component. 
class Event extends Component { 

  d = new Date(this.props.specificEvent.date);
  
  // This function is used to render the component. 
  render() {
    return (
      <div className="innerEventCard" data-testid = "eventCardID">
        <div className="imageCard">
          <div className="image" data-testid = "eventImageID" style={{backgroundImage: `url(${this.props.specificEvent.banner})`}}></div>
          <div className="eventName" data-testid = "eventNameID">{this.props.specificEvent.name}</div>
          <div className="hiddenUntilHover">
          <div className="imageOverlay"></div>
            <div className="societyName">{this.props.specificEvent.society.name}</div>
            <div className="eventDesc">{this.props.specificEvent.description}</div>
            <div className="locationTime">{this.props.specificEvent.location}<br />{this.d.toDateString()}</div>
          </div>
        </div>
      </div>
    );
  }
}


// This is used to check the type of the props passed to the component.

Event.propTypes = {
  specificEvent: PropTypes.object,
  'specificEvent.name': PropTypes.string,
  'specificEvent.description': PropTypes.string,
  'specificEvent.date': PropTypes.string,
  'specificEvent.location': PropTypes.string
};
export default Event;