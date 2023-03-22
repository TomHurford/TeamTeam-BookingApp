// Past events page controllers
//
// Compare this snippet from api/src/controllers/past.js:
// // controller to get past events for a user to display on the past events
// page for a user on the front end
// // Path: api/src/controllers/past.js
const prisma = require('../../prisma/prisma.js');
const {mail} = require('../utils/emails.js');
const auth = require('../utils/jwt_auth.js');
const {randomString} = require('../utils/random.js');


const getPastPurchases = async (req, res) => {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    // Get the user id from the decoded token
    // TODO
    const userId = decoded.id;

    console.log('userId: ', userId);
    // use the user id to get the user's past purchases for events that have
    // already happened
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        event: {
          date: {
            lte: new Date(),
          },
        },
        isArchived: false,
      },
    });


    // Retreive tickets using purchase id and add the tickets to purchase json

    const pastTickets = await Promise.all(purchases.map(async (purchase) => {
      const tickets = await prisma.ticket.findMany({
        where: {
          purchaseId: purchase.id,
        },
      });
      return {
        ...purchase,
        tickets: tickets,
      };
    }));

    // Retreive event using event id and add the event to purchase json for a
    // past ticket
    const pastTicketWithEvent = await Promise.all(pastTickets.map(
        async (ticket) => {
          const event = await prisma.event.findUnique({
            where: {
              id: ticket.eventId,
            },
          });
          return {
            ...ticket,
            event: event,
          };
        }));
    console.log('pastTickets: ', pastTicketWithEvent);
    res.status(200).send({pastTickets: pastTicketWithEvent});
  } catch (err) {
    console.log(err);
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
};


const getFutureTickets = async (req, res) => {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    const userId = decoded.id;

    console.log('userId: ', userId);

    // Get all purchases for the user where the event date is in the future
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        event: {
          date: {
            gte: new Date(),
          },
        },
        isArchived: false,
      },
    });

    // Retreive tickets using purchase id and add the tickets to purchase json

    const futureTickets = await Promise.all(
        purchases.map(async (purchase) => {
          const tickets = await prisma.ticket.findMany({
            where: {
              purchaseId: purchase.id,
            },
          });
          return {
            ...purchase,
            tickets: tickets,
          };
        }),
    );

    // Retreive event using event id and add the event to purchase json
    const futureTicketWithEvent =
      await Promise.all(futureTickets.map(async (ticket) => {
        const event = await prisma.event.findUnique({
          where: {
            id: ticket.eventId,
          },
        });
        return {
          ...ticket,
          event: event,
        };
      }));
    console.log('purchases: ', purchases);


    console.log('futureTickets: ', futureTickets);
    res.status(200).send({futureTickets: futureTicketWithEvent});
  } catch (err) {
    console.log(err);
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
};

const createPurchase = async (req, res) => {
  // (user token, payment status, total, payment method, event id, tickets)
  let decoded = null;
  try {
    decoded = await auth.authenticate(req);
  } catch (err) {
    return res.status(401).send({message: 'Unauthorised'});
  }

  if (
    req.body === undefined ||
    req.body.status === undefined ||
    req.body.total === undefined ||
    req.body.method === undefined ||
    req.body.ticket_quantities === undefined ||
    req.body.eventId === undefined
  ) {
    return res.status(400).send({message: 'Missing Body'});
  }


  const event = await prisma.event.findFirst({
    where: {
      id: req.body.eventId,
    },
  });

  if (!event) return res.status(400).send({message: 'Invalid Event ID'});

  const payment = await prisma.purchase.create({
    data: {
      total: req.body.total,
      paymentMethod: 'paypal',
      user: {
        connect: {
          id: decoded.id,
        },
      },
      event: {
        connect: {
          id: req.body.eventId,
        },
      },
    },
  });

  let quantity = 0;

  const tickets = [];

  for (const type of req.body.ticket_quantities.types) {
    key = type.id;
    value = type.quantity;

    const ticketType = await prisma.ticketType.findFirst({
      where: {
        id: key,
      },
    });

    if (!ticketType) {} else {
      for (let i = 0; i < value; i++) {
        quantity++;

        const ticketEncode = {
          ticketTypeName: ticketType.name,
          ticketTypeID: ticketType.id,
          userID: decoded.id,
          eventID: event.id,
          purchaseID: payment.id,
          ticketSecret: randomString(),
        };
        const tickettext = Buffer.from(
            JSON.stringify(ticketEncode)).toString('base64');
        tickets.push({
          'qrData': tickettext,
          'String': ticketType.ticketType + ' ' + event.name + quantity,
        });

        await prisma.ticket.create({
          data: {
            ticketData: tickettext,
            purchase: {
              connect: {
                id: payment.id,
              },
            },
            ticketType: {
              connect: {
                id: ticketType.id,
              },
            },
            event: {
              connect: {
                id: event.id,
              },
            },
            user: {
              connect: {
                id: decoded.id,
              },
            },
          },
        });
      }
    }
  }

  const user = await prisma.user.findFirst({
    where: {
      id: decoded.id,
    },
  });

  const eventDate = new Date(event.date);

  mail(to=user.email, subject='Purchase Confirmation', body=`
  <h2>Purchase Confirmation Order #` + payment.id + `</h2><br />
  <br />
  <h4> Confirmation Of Order Details:</h4><br />
  <p><br />
  Event Name: <a href="https://localhost:3000/event-details?eventId=` + event.id + `">` + event.name + `</a><br />
  Event Date: ` + eventDate.toDateString() + `<br />
  Event Date: ` + eventDate.toTimeString() + `<br />
  Event URL: <a>https://localhost:3000/event-details?eventId=` + event.id + `</a><br />
  <br />
  <br />
  Quantity Of Tickets: ` + quantity + `<br />
  Payment Method: ` + req.body.method + `<br />
  Total Sum Of Tickets: ` + req.body.total + `<br />
  <br />
  <br />
  </p>
  `, qrYes=true, qrcodes=tickets);

  return res.status(200).send({message: 'Success'});
};


module.exports = {
  getPastPurchases,
  getFutureTickets,
  createPurchase,
};
