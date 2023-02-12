import React,{Component} from "react";  
import EventInfo from "./EventInfo";
import '../styles/Events.css';
import '../styles/Home.css';

class EventDetails extends Component{
  constructor(props) {
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
  

  // render(){
  //   const event = this.state.data[0];
  //   return(
  //       <div className="homePage">
  //       <ul className="events">
  //         <Event specificEvent = {event}/>
  //       </ul>
  //       </div>
  //   )
  // }

  render(){
    const event = this.state.data[0];
    if (!event) {
      return <div>Loading...</div>;
    }
    return(
        <div className="homePage" >
          <h1>Event Details</h1>
          <h1>Event Details</h1>
          <EventInfo specificEvent = {event}/>
        </div>
    );
  }
  

}

export default EventDetails;