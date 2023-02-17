import React, {Component} from 'react';
import '../styles/Basket.css';

class Basket extends Component {
  render() {
    console.log(this.props.tickets);
    return (
    <div className="basket">
    <h1> Basket </h1>
    <h1> Basket </h1>
    <ol className="basket">
      {this.props.tickets.map((ticket) => (
        <li key={ticket.id}>
          <div className="basket-item">
            <p  className="basket-item-event-name">{ticket.ticket.name}</p>
            <p  className="basket-item-type">{ticket.ticket.type}</p>
            <p  className="basket-item-price">$ {ticket.ticket.price}</p>
            <button className="basket-item-remove" onClick={() => this.props.removeTicket(ticket)}>Remove</button>
          </div>
        </li>
      ))}
    </ol>
    <h1>Total: ${this.props.totalPrice}</h1>
    </div>
    );
  }
}

export default Basket;