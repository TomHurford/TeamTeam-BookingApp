import React,{Component} from "react";  
import Event from "./Event";
import '../styles/Events.css';
import '../styles/Home.css';

class EventDetails extends Component{
  constructor(props){
    super(props);
    this.state = {data: []}
    this.fetchData();
  }


  fetchData() {
    fetch('http://localhost:5001/events')
    .then(response => response.json())
    .then(eventsList => {this.setState({data: eventsList})})
    .catch(error => console.error(error))
}

  render(){
    const searchParams = new URLSearchParams(window.location.search);
    const eventId = searchParams.get('eventId');
    const event = this.state.data[eventId - 1];
    if (!event) {
      return <div>Loading...</div>;
    }
    return(
      <div>
        <h1>Event Details</h1>
        <h1><Event specificEvent = {event}/></h1>
      </div>
    )
  }
  

}


export default EventDetails;