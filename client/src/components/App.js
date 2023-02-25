import Home from "./Home";
import "../styles/App.css";
import React, {useEffect} from "react";
import Contact from "./Contact";
import Login from './Login';
import Purchase from './Purchase';
import PayPal from './PayPal';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import EventDetails from "./Events/EventDetails";
import Basket from "./Basket";
import ViewSociety from "./Societies/ViewSociety";
import CreateSocietyForm from "./Societies/CreateSocietyForm";
import SearchSocieties from "./Societies/SearchSocieties";
import EditSocietyForm from "./Societies/EditSocietyForm";

//Routes to connect to the homepage, the contact page and other pages which can be added here

function App() {
  const [tickets, setTickets] = React.useState([]);
  const [ticketId, setTicketId] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('tickets');
    const storedTicketId = sessionStorage.getItem('ticketId');
    const storedTotalPrice = sessionStorage.getItem('totalPrice');
    if(storedTickets) {
      setTickets(JSON.parse(storedTickets));
      console.log("current tickets");
      console.log(tickets);
      console.log("stored tickets");
      console.log(JSON.parse(storedTickets));
      console.log(storedTickets);

    }
    if(storedTicketId) {
      setTicketId(JSON.parse(storedTicketId));
    }
    if(storedTotalPrice) {
      setTotalPrice(JSON.parse(storedTotalPrice));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('tickets', JSON.stringify(tickets));
    sessionStorage.setItem('ticketId', JSON.stringify(ticketId));
    sessionStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [tickets, ticketId, totalPrice]);

  const addTicket = (ticket) => {
    setTickets([...tickets, { ticket, id: ticketId }]);
    setTicketId(ticketId + 1);
    setTotalPrice(totalPrice + ticket.price);
  };

  const removeTicket = (ticket) => {
    setTickets(tickets.filter((t) => t.id !== ticket.id));
    setTotalPrice(totalPrice - ticket.ticket.price);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path = "/login" element={<Login/>}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/purchase" element={<Purchase />}></Route>
        <Route path="/paypal" element={<PayPal />}></Route>

        <Route
          path="/event-details"
          element={<EventDetails addTicket={addTicket} />}
        ></Route>
        <Route
          path="/basket"
          element={
            <Basket
              tickets={tickets}
              removeTicket={removeTicket}
              totalPrice={totalPrice}
            />
          }
        ></Route>
        
        <Route path="/societies/:id/:name?" element={<ViewSociety />} />
        <Route path="/societies" element={<SearchSocieties />} />
        <Route path="/create-society" element={<CreateSocietyForm />} />
        <Route path="/edit-society" element={<EditSocietyForm />} />
      </Routes>
    </div>
  );
}

export default App;
