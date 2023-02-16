import React,{Component} from "react";  
import ExtendedEvent from "./ExtendedEvent";
import '../../styles/Events.css';
import '../../styles/Home.css';

class EventDetails extends Component{
  constructor(props){
    super(props);
    this.state = {data: null}
    this.fetchData();
  }


  fetchData() {
    const searchParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(searchParams.get('eventId'));
    console.log(eventId);
    fetch('http://localhost:5001/events', 
    {
    method: 'POST',
    mode: 'cors', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({"eventId": eventId})
    }
    )
    .then(response => response.json())
    .then(event => {
      this.setState({data: event})
      console.log("Response"+event);
    })
    .catch(error => console.error(error))
}

  render(){
    const event = this.state.data;
    // console.log(this.state.data);
    if (!event) {
      return <div>Loading...</div>;
    }
    return(
      <div>
        <h1>Event Details</h1>
        <h1><ExtendedEvent specificEvent = {event.event} ticketTypes = {event.ticket_types} specificSociety = {event.society}/></h1>
      </div>
    )
  }
}


export default EventDetails;