import React, { useState, useEffect } from 'react';
import TicketHolderTicket from './Events/TicketHolder';
import PropTypes from 'prop-types';
import { generateTickets } from '../utils/ticketGenerator';
import '../styles/Basket.css';
import {Link} from 'react-router-dom';

function Basket(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [emActive, setEmActive] = useState("active");
  const [baActive, setBaActive] = useState("");

  useEffect(() => {
    setTotalPrice(props.totalPrice())
  }, [])

  useEffect(() => {
    setTotalPrice(props.totalPrice());
    if (props.basketEvent['a'] === 'b') {
      setEmActive("active");
      setBaActive("");
    } else {
      setEmActive("");
      setBaActive("active");
    }
    console.log(props.basketEvent)
  }, [props.tickets])

  async function checkout() {
    if (!props.isLoggedIn) {
      window.location = '/login';
    }

    props.emptyBasket();
    // const res = await generateTickets(props.basketEvent, props.availableTicketTypes, props.tickets, props.totalPrice());

    // if (res) {
    //   props.emptyBasket();
    //   //window.location = '/tickets';
    // } else {
    //   // refund payment and call help lol displat error
    // }
  }

  return (
    <div className='page-container'>
      <div className='underlay'></div>

      <div className='basket-container' id={baActive}>
        <div className='header'>
          <h1 className='title'> Basket </h1>
        </div>
        <div className='body'>
          <div className='left'>
            <div className='event'>

            </div>
            <ol className="basket">
              {
                props.availableTicketTypes.map((ticketType) => {
                  return <TicketHolderTicket key={ticketType.id} event={props.basketEvent} tickets={props.tickets} ticketType={ticketType} addTicket={props.addTicket} removeTicket={props.removeTicket}/>
                })
              }
            </ol>
          </div>
          <div className='right'>
            {props.isLoggedIn ? <button onClick={() => {checkout()}}>Checkout</button> : <div>You Need To Be Signed In <button onClick={() => {window.location = '/login'}}>Log In</button> </div>}
            <h1>Total: £{totalPrice}</h1>
          </div>
        </div>
        <div className='footer'>
        </div>
      </div>
      <div className='empty-basket basket-container' id={emActive}>
        <div className='header'>
          <h1 className='title'> Basket </h1>
        </div>
        <div className='body'>
          <p>
            <b>Your bag is empty</b><br />
            Check out <Link to="/">events</Link> and come back here to checkout!
          </p>
        </div>
        <div className='footer'></div>
      </div>
  </div>
  );
}

//<Paypal totalPrice={props.totalPrice} event={props.basketEvent} tickets={props.tickets} />

Basket.propTypes = {
  basketEvent: PropTypes.object,
  availableTicketTypes: PropTypes.array,
  tickets: PropTypes.object,
  totalPrice: PropTypes.func,
  removeTicket: PropTypes.func,
  addTicket: PropTypes.func,
  emptyBasket: PropTypes.func,
};
export default Basket;