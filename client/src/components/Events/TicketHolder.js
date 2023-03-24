import React,{Component} from "react";  
import PropTypes from 'prop-types';
import '../../styles/Events.css';

class TicketHolderTicket extends Component{
    constructor(props){
        super(props);
        this.state = {tickets: this.props.tickets()}
    }
  
    componentDidMount() {
      this.setState({ tickets: this.props.tickets });
    }

    changeLocalTicketCount() {
        this.setState({ tickets: this.props.tickets });
        this.props.extraChanges(0);
      }

    render(){
        const ticketType = this.props.ticketType;
        return ( 
        <div className="ticket"  key={ticketType.id}>
                <div className="ticketHeader">{ticketType.ticketType}</div>
                <div className="price">Price: £{ticketType.price}</div>
                <div className="spacesBar"><div className="innerBar" data-free={ticketType.quantity}></div></div>
                <div className="cartControl">
                    <div data-testid={"left"+ticketType.price}className="left arrow" onClick={() => {this.props.removeTicket(this.props.event, ticketType); this.changeLocalTicketCount()}}></div>
                    <div className="number">{this.state.tickets[ticketType.id] ? this.state.tickets[ticketType.id] : '0'}</div>
                    <div data-testid={"right"+ticketType.price}className="right arrow" onClick={() => {this.props.addTicket(this.props.event, ticketType); this.changeLocalTicketCount()}}></div>
                </div>
                </div>
        );
    }
}

TicketHolderTicket.propTypes = {
  addTicket: PropTypes.func,
  tickets: PropTypes.object,
  removeTicket: PropTypes.func,
  extraChanges: PropTypes.func,
  event: PropTypes.object
};
export default TicketHolderTicket;