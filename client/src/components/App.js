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

//Routes to connect the different pages of the application . This is the main component of the application.

function App() {
  /* LOG IN FUNCTIONALITY */

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    jwtController.checkIsLoggedIn().then((res) => {
      setIsLoggedIn(res);
    });
  }, []);

  /* BASKET FUNCTIONALITY */

  const getBasketInUse = () => {
    try {
      if (JSON.parse(sessionStorage.getItem("basketInUse")) === null)
        return false;
      return JSON.parse(sessionStorage.getItem("basketInUse"));
    } catch (err) {
      return false;
    }
  };

  // Sets the basket to be in use
  const setBasketInUse = () => {
    sessionStorage.setItem("basketInUse", JSON.stringify(true));
  };

  // Gets the event in the basket
  const getBasketEvent = () => {
    try {
      if (sessionStorage.getItem("basketEvent")) {
      } else {
        console.log(0);
        return {};
      }
      return JSON.parse(sessionStorage.getItem("basketEvent"));
    } catch (err) {
      return {};
    }
  };
  // Sets the event in the basket
  const setBasketEvent = (basketEvent) => {
    sessionStorage.setItem("basketEvent", JSON.stringify(basketEvent));
  };
  // Gets the ticket types for the event in the basket
  const getTicketTypes = () => {
    try {
      if (Object.keys(getBasketEvent()).length === 0) return [];
      return getBasketEvent().ticketTypes;
    } catch (err) {
      return [];
    }
  };

  const getTickets = () => {
    try {
      if (sessionStorage.getItem("tickets")) {
      } else {
        return {};
      }

      return JSON.parse(sessionStorage.getItem("tickets"));
    } catch (err) {
      return {};
    }
  };
  // Sets the tickets in the basket
  const setTickets = (tickets) => {
    sessionStorage.setItem("tickets", JSON.stringify(tickets));
  };

  const totalPrice = () => {
    var total = 0;

    if (!getBasketInUse()) {
      return total;
    }

    var tickets = getTickets();

    getTicketTypes().map((type) => {
      if (tickets[type.id] === undefined || tickets[type.id] === 0) {
      } else {
        total += tickets[type.id] * type.price;
      }
    });

    if (Number.isNaN(total)) {
      return 0;
    } else {
      return total;
    }
  };

  // Adds a ticket to the basket
  const addTicket = (callData, ticketType) => {
    var event = callData.event;
    console.log(callData);

    if (!getBasketInUse() || getTickets() === {}) {
      setBasketInUse();
      setBasketEvent(event);
      setTickets({ [ticketType.id]: 1 });
    } else if (getBasketEvent().id != event.id) {
      setBasketEvent(event);
      setTickets({ [ticketType.id]: 1 });
    } else {
      let tickets = getTickets();
      if (!tickets[ticketType.id]) {
        tickets[ticketType.id] = 1;
      } else {
        tickets[ticketType.id] += 1;
      }
      setTickets(tickets);
    }

    return getTickets()[ticketType.id];
  };

  // Removes a ticket from the basket
  const removeTicket = (callData, ticketType) => {
    var event = callData.event;

    if (!getBasketInUse()) {
      setBasketInUse();
      setBasketEvent(event);
      setTickets({ [ticketType.id]: 0 });
    } else if (getBasketEvent().id != event.id) {
      setBasketEvent(event);
      setTickets({ [ticketType.id]: 0 });
    } else {
      let tickets = getTickets();
      if (!tickets[ticketType.id]) tickets[ticketType.id] = 0;
      else tickets[ticketType.id] -= 1;
      setTickets(tickets);
    }

    return getTickets()[ticketType.id];
  };

  // Empties the basket
  const emptyBasket = () => {
    sessionStorage.removeItem("basketInUse");
    sessionStorage.setItem("basketEvent", {});
    sessionStorage.setItem("availableTicketTypes", []);
    sessionStorage.setItem("tickets", {});
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
                tickets={getTickets}
                removeTicket={removeTicket}
              />
            }
          ></Route>
          <Route
            path="/basket"
            element={
              <Basket
                basketEvent={getBasketEvent()}
                availableTicketTypes={getTicketTypes()}
                tickets={getTickets}
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
