import React, {Component} from 'react';
import '../styles/TitleOfPage.css';
import PropTypes from 'prop-types';

class Basket extends Component {
  render() {
    return (
    <div>  
      <h1 className='title'> Basket </h1>
    <ol className="basket">
      {this.props.tickets && this.props.tickets.map((ticket) => (
        <li key={ticket.id}>
          <div className="basket-item">
            <p  className="basket-item-event-name">{ticket.ticket.name}</p>
            <p  className="basket-item-type">{ticket.ticket.type}</p>
            <p  className="basket-item-price">$ {ticket.ticket.price}</p>
            <button className="basket-item-remove"  data-testid="remove-button" onClick={() => this.props.removeTicket(ticket)}>Remove</button>
          </div>
        </li>
      ))}
    </ol>
    <h1>Total: ${this.props.totalPrice}</h1>
    </div>
    );
  }
}

Basket.propTypes = {
  tickets: PropTypes.array,
  totalPrice: PropTypes.number,
  removeTicket: PropTypes.func
};
export default Basket;