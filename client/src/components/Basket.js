
import React, {Component} from 'react';
import '../styles/Basket.css';
import Item from './Item';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      item:[],
      totalPrice: 0,
      count: 0
    };  
  }

  render() {
    return (
      <div className="cart">
        <h1>Basket</h1>
        <h1></h1>
        <h1></h1>
        {/* <h1>{this.state.eventName}</h1> */}
        <p>Order Summary</p>
        <button onClick={()=>this.addItem()}>Add to Cart</button>
        <button onClick={()=>this.removeItem()}>Remove from Cart</button>
        {/* <p>{this.state.ticket}</p> */}
        <div className="items">
          {this.state.item}
        </div>
        <p>Items {this.state.count}</p>
        <p>Total {this.state.totalPrice}</p>
        <button>Checkout</button>
      </div>
    );
  }

  addItem(){
    const item = <Item/>;
    this.setState({item: [item]});
    this.setState({totalPrice: this.state.totalPrice + 20});
    this.setState({count: this.state.count + 1});
  }

  removeItem(){
    this.state.count === 1 && this.setState({item: []}) ;
    this.state.count !== 0 && this.setState({totalPrice: this.state.totalPrice - 20});
    this.state.count !== 0 && this.setState({count: this.state.count - 1});
  }
}

export default Basket;