import React, {Component} from "react";
import '../../styles/EventCard.css';

//Creating an event component to show event details

class ExtendedEvent extends Component { 
  constructor(props) {
    super(props);
    this.state = { tickets: [], totalPrice : 0, count : 0, id: 0};
  }

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
              <span className="ticketType">{ticketType.ticketType} </span>
              <span className="ticketPrice">{ticketType.price} </span>
              <button onClick={() => 
              this.props.addTicket({
                "name":this.props.specificEvent.name,
                "type":ticketType.ticketType,
                "price":ticketType.price
                })}>Add to Cart</button>
            </li>
          ))}
        </ul>
        <p>society name: {this.props.specificSociety.name}</p>
        <p>society description: {this.props.specificSociety.description}</p>
        <p>society email: {this.props.specificSociety.email}</p>

        <h3>Basket</h3>
        <p>Order Summary</p>
        <p>Total: {this.state.totalPrice}</p>
        <p>Items: {this.state.count}</p>
        <ol>
        {this.state.tickets.map(ticket => (
          <p key={ticket.id}>{ticket.type} {ticket.price}</p>
        ))}
        </ol>
      </div>
    );
  }
}

export default ExtendedEvent;