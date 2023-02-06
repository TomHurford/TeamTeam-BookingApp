import React, {Component} from "react";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      eventName: 'DevFest 2020',
      ticket: 'Standard',
      price: 20,
    };  
  }

  render() {
    return (
      <div className="item">
        <h1>{this.state.name}</h1>
        <p>{this.state.eventName}  ${this.state.price} </p>
      </div>
    );
  }
}

export default Item;