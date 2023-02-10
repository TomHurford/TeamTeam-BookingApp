import React, {Component} from "react";
import '../styles/Events.css';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.fetchData();
    }

    
    fetchData() {
        fetch('http://localhost:5001/events')
        .then(response => response.json())
        .then(data => {this.setState({data: data})})
        .catch(error => console.error(error))
    }

    render(){
        return(
            <ul className="events">
                {this.state.data.map(event => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        )
    }
}
export default Home
