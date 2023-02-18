import Home from './Home'
import '../styles/App.css';
import React from 'react';
import Contact from './Contact';
import Login from './Login';
import {Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import EventDetails from './Events/EventDetails';
import Basket from './Basket';

//Routes to connect to the homepage, the contact page and other pages which can be added here

function App() {
  const [tickets, setTickets] = React.useState([]);
  const [ticketId, setTicketId] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const addTicket = (ticket) => {
    setTickets([...tickets, {ticket, id: ticketId}]);
    setTicketId(ticketId + 1);
    setTotalPrice(totalPrice + ticket.price);
  }

  const removeTicket = (ticket) => {
    setTickets(tickets.filter((t) => t.id !== ticket.id));
    setTotalPrice(totalPrice - ticket.ticket.price);
  }

  return (
    <div className='root-container'>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Home/>}></Route>
        <Route path = "/contact" element={<Contact/>}></Route>
        <Route path = "/login" element={<Login/>}></Route>
        <Route path = "/event-details" element={<EventDetails addTicket = {addTicket}/>}></Route>
        <Route path = "/basket" element={<Basket tickets = {tickets} removeTicket = {removeTicket} totalPrice = {totalPrice}/>}></Route>
      </Routes>
      
    </div>
  )
  
}

export default App;

