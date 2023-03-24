import React, { useState, useEffect } from "react";
import TicketHolderTicket from "./Events/TicketHolder";
import PropTypes from "prop-types";
const generateTickets = require("../utils/ticketGenerator.js");
import "../styles/Basket.css";
import "../styles/index.css";
import { Link } from "react-router-dom";

// This component is the basket page. It displays the tickets in the basket and allows the user to checkout.
function Basket(props) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [emActive, setEmActive] = useState("active");
  const [baActive, setBaActive] = useState("");

  useEffect(() => {
    setTotalPrice(props.totalPrice());
  }, []);

  useEffect(() => {
    setTotalPrice(props.totalPrice());
    if (props.basketEvent["a"] === "b") {
      setEmActive("active");
      setBaActive("");
    } else {
      setEmActive("");
      setBaActive("active");
    }
    console.log(props.basketEvent);
  }, [props.tickets]);

  async function checkout() {
    if (!props.isLoggedIn) {
      window.location = "/login";
    }

    const res = await generateTickets.generateTickets(
      props.basketEvent,
      props.availableTicketTypes,
      props.tickets,
      props.totalPrice()
    );

    if (res) {
      props.emptyBasket();
      window.location = "/tickets";
    } else {
    }
  }

  const updateBasketTotal = () => {
    console.log(props.totalPrice())
    setTotalPrice(props.totalPrice())
  }

  return (
    <div className="page-container">
      <div className="underlay"></div>

      <div className="basket-container" id={baActive}>
        <div className="header">
          <h1 className="title"> Basket </h1>
        </div>
        <div className="body">
          <div className="left">
            <div className="event"></div>
            <ol className="basket">
              {props.availableTicketTypes.map((ticketType) => {
                return (
                  <TicketHolderTicket
                    extraChanges={updateBasketTotal}
                    key={ticketType.id}
                    event={{event: props.basketEvent}}
                    tickets={props.tickets}
                    ticketType={ticketType}
                    addTicket={props.addTicket}
                    removeTicket={props.removeTicket}
                  />
                );
              })}
            </ol>
          </div>
          <div className="right">
            {props.isLoggedIn ? (
              <button
                className="button"
                onClick={() => {
                  checkout();
                }}
              >
                Checkout
              </button>
            ) : (
              <div>
                You Need To Be Signed In{" "}
                <button
                  onClick={() => {
                    window.location = "/login";
                  }}
                >
                  Log In
                </button>{" "}
              </div>
            )}
            <h1>Total: £{totalPrice}</h1>
          </div>
        </div>
      </div>
      <div className="empty-basket basket-container" id={emActive}>
        <div className="header">
          <h1 className="title"> Basket </h1>
        </div>
        <div className="body">
          <p>
            <b>Your bag is empty</b>
            <br />
            Check out <Link to="/">events</Link> and come back here to checkout!
          </p>
        </div>
      </div>
    </div>
  );
}

Basket.propTypes = {
  basketEvent: PropTypes.object,
  availableTicketTypes: PropTypes.array,
  tickets: PropTypes.func,
  totalPrice: PropTypes.func,
  removeTicket: PropTypes.func,
  addTicket: PropTypes.func,
  emptyBasket: PropTypes.func,
};
export default Basket;
