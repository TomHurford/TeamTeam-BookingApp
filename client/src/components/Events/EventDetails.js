import React,{Component} from "react";  
import '../../styles/Events.css';
import '../../styles/Home.css';
import '../../styles/TitleOfPage.css'
import {getEventById} from "../../utils/EventsLogic"
import PropTypes from 'prop-types';

class EventDetails extends Component{
  constructor(props){
    super(props);
    this.state = {data: null}
    this.fetchData();
  }


  async fetchData() {
    const searchParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(searchParams.get('eventId'));
    const event = await getEventById(eventId);
    this.setState({ data: event });
  }

  render(){
    const event = this.state.data;
    if (!event) {
      return <div>Loading...</div>;
    }
    return(
      <div className="page-container">
        <div className='underlay'></div>

        <div className="header">
          <div className="image" style={{backgroundImage: `url(${event.event.banner})`}}></div>
          <div className="title" >{event.event.name}</div>
        </div>

        <div className="body">

          <div className="description">
            <h2>Description</h2>
            <div className="text">{event.event.description}</div>
          </div>
          <div className="societyInfo">
            <div className="icon"><div className="logo" style={{backgroundImage: `url(${event.societyLinks.logo})`}}></div></div>
            <div className="name">{event.society.name}</div>
            <div className="description">{event.society.description}</div>
            <div className="socials">
              <a href={this.state.data.societyLinks.facebook} className="socialCircle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="facebook" />
              </a>
              <a href={this.state.data.societyLinks.twitter} className="socialCircle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png" alt="twitter" />
              </a>
              <a href={this.state.data.societyLinks.instagram} className="socialCircle">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="instagram" />
              </a>
              <a href={this.state.data.societyLinks.website} className="socialCircle">
                <img src="https://w7.pngwing.com/pngs/549/715/png-transparent-web-development-logo-website-web-design-symmetry-internet.png" alt="website" />
              </a>
            </div>
          </div>

          <div className="tickerHolder">
            <h2>Tickets</h2>
            {
              event.ticket_types.map((ticketType) => {
                return <div className="ticket"  key={ticketType.id}>
                  <div className="ticketHeader">{ticketType.ticketType}</div>
                  <div className="price">Price: {ticketType.price}</div>
                  <div className="spacesBar"><div className="innerBar" data-free={ticketType.quantity}></div></div>
                  <button className="addToCart" onClick={() => 
                    this.props.addTicket({
                      "name":event.event.name,
                      "type":ticketType.ticketType,
                      "price":ticketType.price
                      })}>Add To Cart</button>
                </div>
              })
            }
          </div>

          <div className="spacer"></div>

        </div>

      </div>
    )
  }
}

EventDetails.propTypes = {
  addTicket: PropTypes.func
};

export default EventDetails;