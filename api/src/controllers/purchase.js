// Past events page controllers
//
// Compare this snippet from api/src/controllers/past.js:
// // controller to get past events for a user to display on the past events page for a user on the front end
// // Path: api/src/controllers/past.js
const prisma = require('../../prisma/prisma.js'); 
const auth = require('../utils/jwt_auth.js');



const getPastPurchases = async (req, res) => {
  try {
    // Authenticate the user
    // const decoded = await auth.authenticate(req)

    // Get the user id from the decoded token
    // TODO 
    const userId = req.body.userId// decoded.id

    console.log("userId: ", userId)
    // use the user id to get the user's past purchases
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId
      }
    })

    console.log("purchases: ", purchases)
    res.status(200).send({ purchases: purchases});
  } catch (err) {
    console.log(err)
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}

const getFutureTickets = async (req, res) => {
  try {
    // Authenticate the user
    // const decoded = await auth.authenticate(req)

    const userId = req.body.userId;

    console.log("userId: ", userId)

    // Get all purchases for the user where the event date is in the future
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        event: {
          date: {
            gte: new Date()
          }
        },
        isArchived: false
      }
    })

    // Retreive tickets using purchase id and add the tickets to purchase json

    const futureTickets = await Promise.all(purchases.map(async (purchase) => {
      const tickets = await prisma.ticket.findMany({
        where: {
          purchaseId: purchase.id
        }
      })
      return {
        ...purchase,
        tickets: tickets
      }
    }))



    console.log("futureTickets: ", futureTickets)
    res.status(200).send({ futureTickets: futureTickets });
  } catch (err) {
    console.log(err)
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}

const createPurchase = async () => {

  // (user token, payment status, total, payment method, event id, tickets, quantity)
  let decoded = null;
  try {
      decoded = await auth.authenticate(req);
  } catch (err) {
      return res.status(401).send({message: 'Unauthorised'});
  }
  
  if (req.body === undefined || req.body.status === undefined || req.body.total === undefined || req.body.method === undefined || req.body.tickets === undefined || req.body.eventId === undefined || req.body.quantity === undefined) {
      return res.status(400).send({message: 'Missing Body'});
  }

  let event = await prisma.event.findFirst({
    where: {
      id: eventId
    }
  })

  if (!event) return res.status(400).send({message: 'Invalid Event ID'});

  let payment = await prisma.payment.create({
    data: {
      total: req.body.total,
      paymentMethod: "paypal",
      user: {
        connect: {
          id: decoded.user.id
        }
      },
      event: {
        connect: {
          id: req.body.eventId
        },
      },
    }
  });

  for (var i = 0; i < req.body.tickets.length; i++) {

  }



}
    

module.exports = {
  getPastPurchases,
  getFutureTickets
}