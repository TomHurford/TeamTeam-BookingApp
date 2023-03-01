import React, { useRef, useState, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
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
                    value: 650.0,
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
    <div className='page-container'>
        <div className='underlay'></div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div ref={paypal} style={{ maxWidth: "500px" }}></div>
        </div>
    </div>
  );
}

