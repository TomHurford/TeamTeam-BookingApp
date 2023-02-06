
import React, {Component} from 'react';
import '../styles/Basket.css';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventName: '',
      ticket: '',
      totalPrice: 0
    };  
  }

  render() {
    return (
      <div className="cart">
        <h1>{this.state.eventName}</h1>
        <p>Order Summary</p>
        <p>{this.state.ticket}</p>
        <p>Total {this.state.totalPrice}</p>
        <button>Checkout</button>
      </div>
    );
  }
}

export default Basket;