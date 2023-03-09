import React, { useRef, useState, useEffect } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    var totalPrice = props.totalPrice(); 
    console.log(hasRendered);
    if (!hasRendered) {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            err;
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Event Ticket",
                  amount: {
                    currency_code: "GBP",
                    value: totalPrice,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
      setHasRendered(true);
    }
  }, [hasRendered]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div ref={paypal} style={{ maxWidth: "500px" }}></div>
    </div>
  );
}

