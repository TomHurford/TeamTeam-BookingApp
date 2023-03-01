import React, {Component} from 'react';
import TicketHolderTicket from './Events/TicketHolder';
import PropTypes from 'prop-types';
import { generateTickets } from '../utils/ticketGenerator';

class Basket extends Component {
  constructor(props){
    super(props);
    this.state = {tickets: this.props.tickets, totalPrice: this.props.totalPrice()}
  }

  componentDidMount() {
    this.setState({totalPrice: this.props.totalPrice()})
  }

  componentDidUpdate() {
    this.props.totalPrice();
    console.log('state change')
  }

  ticketsChange() {
    console.log('tickets change')
    this.setState({ totalPrice: this.props.totalPrice() })
  }

  checkout() {
    if (!this.props.isLoggedIn) {
      window.location = '/login';
    }

    generateTickets(this.props.basketEvent, this.props.availableTicketTypes, this.props.tickets);

  }

  render() {
    var totalPrice = this.state.totalPrice;
    return (
      <div className='page-container'>
          <div className='underlay'></div>
      <h1 className='title'> Basket </h1>
      <ol className="basket">
        {
          this.props.availableTicketTypes.map((ticketType) => {
            return <TicketHolderTicket extraChanges={this.ticketsChange} key={ticketType.id} event={this.props.basketEvent} tickets={this.props.tickets} ticketType={ticketType} addTicket={this.props.addTicket} removeTicket={this.props.removeTicket}/>
          })
        }
      </ol>
      <h1>Total: £{totalPrice}</h1>
      {this.props.isLoggedIn ? <button onClick={this.checkout()}>Checkout</button> : <div>You Need To Be Signed In <button onClick={() => {window.location = '/login'}}>Log In</button> </div>}
    </div>
    );
  }
}

//<Paypal totalPrice={this.props.totalPrice} event={this.props.basketEvent} tickets={this.props.tickets} />

Basket.propTypes = {
  basketEvent: PropTypes.object,
  availableTicketTypes: PropTypes.array,
  tickets: PropTypes.object,
  totalPrice: PropTypes.func,
  removeTicket: PropTypes.func,
  addTicket: PropTypes.func,
};
export default Basket;