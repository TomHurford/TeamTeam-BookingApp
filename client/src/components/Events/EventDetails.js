import React, { Component } from "react";
import "../../styles/Events.css";
import "../../styles/Home.css";
import "../../styles/TitleOfPage.css";
import { getEventById } from "../../utils/EventsLogic";
import TicketHolderTicket from "./TicketHolder";
import PropTypes from "prop-types";
import "../../styles/index.css";

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, tickets: null };
    this.fetchData();
  }

  async fetchData() {
    const searchParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(searchParams.get("eventId"));
    const event = await getEventById(eventId);
    this.setState({ data: event });
  }

  handleClick = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(searchParams.get("eventId"));
    window.location.href = "/edit-event/" + eventId;
  };

  render() {
    const event = this.state.data;
    if (!event) {
      return <div>Loading...</div>;
    }
    return (
      <div className="page-container">
        <div className="underlay"></div>

        <div className="header">
          <div
            className="image"
            style={{ backgroundImage: `url(${event.event.banner})` }}
          ></div>
          <div className="title">{event.event.name}</div>
        </div>

        <div className="body">
          <div className="description">
            <h2>Description</h2>
            <div className="text">{event.event.description}</div>
            <div className="text">
              {
                <a href={event.event.society.links[0].website}>
                  {event.event.society.links[0].website}
                </a>
              }
            </div>
            <div className="eventDate">
              Date: {new Date(event.event.date).toLocaleDateString()}
            </div>
            <div className="eventTime">
              Time: {new Date(event.event.date).toLocaleTimeString()}
            </div>
            {/* { event.isCommittee ? <button
              className="addToCart"
              onClick={() => {
                window.location = "/edit-event";
              }}
            >
              Edit Event
            </button> : <br />} */}
          </div>
          <div className="societyInfo">
            <div className="icon">
              {console.log(event)}
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${event.event.society.links[0].logo})`,
                }}
              ></div>
            </div>
            <div className="name">{event.event.society.name}</div>
            <div className="description">{event.event.society.description}</div>
            <div className="socials" style={{ paddingLeft: "60px" }}>
              <a
                href={event.event.society.links[0].facebook}
                className="socialCircle"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                  alt="facebook"
                />
              </a>
              <a
                href={event.event.society.links[0].twitter}
                className="socialCircle"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                  alt="twitter"
                />
              </a>
              <a
                href={event.event.society.links[0].instagram}
                className="socialCircle"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                  alt="instagram"
                />
              </a>
            </div>
          </div>

          {new Date() <= new Date(event.event.date) && (
            <div className="tickerHolder">
              <h2>Tickets</h2>
              {console.log(new Date() <= event.event.date)}
              {event.event.ticketTypes.map((ticketType) => {
                return (
                  <TicketHolderTicket
                    extraChanges={(a) => {
                      a;
                    }}
                    key={ticketType.id}
                    event={event}
                    tickets={this.props.tickets}
                    ticketType={ticketType}
                    addTicket={this.props.addTicket}
                    removeTicket={this.props.removeTicket}
                  />
                );
              })}
              <button
                className="addToCart"
                onClick={() => {
                  window.location = "/basket";
                }}
              >
                Go To Basket
              </button>

              {/* <Link
              to={`/edit-event/${this.getEventId})
              )}`}
            > */}
              {event.isCommittee === true && (
                <button className="button" onClick={this.handleClick}>
                  Edit Event
                </button>
              )}
              {/* </Link> */}
            </div>
          )}

          <div className="spacer"></div>
        </div>
      </div>
    );
  }
}

EventDetails.propTypes = {
  addTicket: PropTypes.func,
  tickets: PropTypes.func,
  removeTicket: PropTypes.func,
};

export default EventDetails;
