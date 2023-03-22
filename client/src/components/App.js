import Home from "./Home";
import React, { useEffect } from "react";
import Contact from "./Contact";
import Login from "./Login";
import Purchase from "./Purchase";
import About from "./About";
import Privacy from "./Privacy";
import Terms from "./Terms";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import EventDetails from "./Events/EventDetails";
import Basket from "./Basket";
import ViewSociety from "./Societies/ViewSociety";
import CreateSocietyForm from "./Societies/CreateSocietyForm";
import SearchSocieties from "./Societies/SearchSocieties";
import EditSocietyForm from "./Societies/EditSocietyForm";
import SearchEvents from "./Events/SearchEvents";
import Logout from "./Logout";
const jwtController = require("../utils/jwt.js");

import CreateEvents from "./Events/CreateEvents";
import EditEvents from "./Events/EditEvents";

const sessionStorage = require("sessionstorage");
import Footer from "./Footer";
import { LoggedInRoutes, PrivateRoutes } from "../utils/PrivateRoutes";

//Routes to connect the different pages of the application

//TODO: Some variables using var instead of let

function App() {
  /* LOG IN FUNCTIONALITY */

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    jwtController.checkIsLoggedIn().then((res) => {
      //res ? console.log('Logged In!') : console.log('Not Logged In!');
      setIsLoggedIn(res);
    });
  }, []);

  /* BASKET FUNCTIONALITY */

  const [basketEvent, setBasketEvent] = React.useState({ a: "b" });
  const [availableTicketTypes, setAvailableTicketTypes] = React.useState([]);
  const [tickets, setTickets] = React.useState({});

  const totalPrice = () => {
    var total = 0;

    availableTicketTypes.map((ticketType) => {
      total += tickets[ticketType.id] * ticketType.price;
    });

    if (Number.isNaN(total)) {
      return 0;
    } else {
      return total;
    }
  };

  useEffect(() => {
    document.title = "Ticketopia | Perfect Tickets, Perfect Time";

    const storedBasketEvent = sessionStorage.getItem("basketEvent");
    const storedAvailableTicketTypes = sessionStorage.getItem(
      "availableTicketTypes"
    );
    const storedTickets = sessionStorage.getItem("tickets");

    if (storedBasketEvent) setBasketEvent(JSON.parse(storedBasketEvent));
    if (storedAvailableTicketTypes)
      setAvailableTicketTypes(JSON.parse(storedAvailableTicketTypes));
    if (storedTickets) setTickets(JSON.parse(storedTickets));
  }, []);

  const addTicket = (callData, ticketType) => {
    var event = callData.event;
    console.log(callData.event)

    if (!basketEvent.event) {
      setBasketEvent(callData);
      setAvailableTicketTypes(callData.event.ticketTypes);
    } else if (basketEvent.event.id !== event.id) {
      // WARN USER TO CLEAR BASKET, ON YES WE PUSH NEW TICKET

      emptyBasket();
      setBasketEvent(callData);
      setAvailableTicketTypes(callData.event.ticketTypes);
      setTickets({});
    } else if (!availableTicketTypes.find((tt) => tt.id === ticketType.id)) {
      return;
    }

    var temptickets = tickets;
    if (!tickets[ticketType.id]) temptickets[ticketType.id] = 1;
    else temptickets[ticketType.id] += 1;

    setTickets(temptickets);

    updateTicketSessionStorage(true);
  };

  const removeTicket = (callData, ticketType) => {
    if (basketEvent === {}) return;

    var temptickets = tickets;
    if (!tickets[ticketType.id]) temptickets[ticketType.id] = 0;
    else temptickets[ticketType.id] -= 1;

    setTickets(temptickets);

    updateTicketSessionStorage(true);
  };

  const updateTicketSessionStorage = (value) => {
    if(value === true){
    sessionStorage.setItem("basketEvent", JSON.stringify(basketEvent));
    sessionStorage.setItem(
      "availableTicketTypes",
      JSON.stringify(availableTicketTypes)
    );
    sessionStorage.setItem("tickets", JSON.stringify(tickets));
    }else{
      sessionStorage.removeItem("basketEvent", JSON.stringify(basketEvent));
      sessionStorage.setItem(
        "availableTicketTypes",
        JSON.stringify([])
      );
      sessionStorage.setItem("tickets", JSON.stringify({}));
    }
  };

  const emptyBasket = () => {
    console.log("emptying basket");
    setBasketEvent({ a: "b" });
    setAvailableTicketTypes([]);
    setTickets({});

    updateTicketSessionStorage(false);
  };

  /* NORMAL ROUTE FUNCTIONALITY VIA ROUTER DOM */

  return (
    <div className="root-container">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<LoggedInRoutes />}>
            <Route
              path="/login"
              element={<Login isLoggedIn={isLoggedIn} />}
            ></Route>
          </Route>
          <Route
            path="/logout"
            element={<Logout isLoggedIn={isLoggedIn} />}
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
          <Route path="/tickets" element={<Purchase />}></Route>
          <Route
            path="/event-details"
            element={
              <EventDetails
                addTicket={addTicket}
                tickets={tickets}
                removeTicket={removeTicket}
              />
            }
          ></Route>
          <Route
            path="/basket"
            element={
              <Basket
                basketEvent={basketEvent}
                availableTicketTypes={availableTicketTypes}
                tickets={tickets}
                removeTicket={removeTicket}
                totalPrice={totalPrice}
                addTicket={addTicket}
                isLoggedIn={isLoggedIn}
                emptyBasket={emptyBasket}
              />
            }
          ></Route>
          <Route path="/society/:id" element={<ViewSociety />} />
          <Route path="/societies" element={<SearchSocieties />} />
          <Route path="/search-events" element={<SearchEvents />} />
          <Route path="*" element={<Home />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/create-society" element={<CreateSocietyForm />} />
            <Route path="/edit-society/:id" element={<EditSocietyForm />} />
            <Route path="/create-event" element={<CreateEvents />} />
            <Route path="/edit-event/:id" element={<EditEvents />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
