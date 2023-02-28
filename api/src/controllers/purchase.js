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
    // use the user id to get the user's past purchases for events that have already happened
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        
        isArchived: false
      }
    })


    // Retreive tickets using purchase id and add the tickets to purchase json

    const pastTickets = await Promise.all(purchases.map(async (purchase) => {
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

    //Retreive event using event id and add the event to purchase json for a past ticket
    const pastTicketWithEvent = await Promise.all(pastTickets.map(async (ticket) => {
      const event = await prisma.event.findUnique({
        where: {
          id: ticket.eventId
        }
      })
      return {
        ...ticket,
        event: event
      }
    }))
    console.log("pastTickets: ", pastTicketWithEvent)
    res.status(200).send({ pastTickets: pastTicketWithEvent});
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

    //Retreive event using event id and add the event to purchase json
    const futureTicketWithEvent = await Promise.all(futureTickets.map(async (ticket) => {
      const event = await prisma.event.findUnique({
        where: {
          id: ticket.eventId
        }
      })
      return {
        ...ticket,
        event: event
      }
    }))
    console.log("purchases: ", purchases)
    

    console.log("futureTickets: ", futureTickets)
    res.status(200).send({ futureTickets:futureTicketWithEvent });
  } catch (err) {
    console.log(err)
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}
    

module.exports = {
  getPastPurchases,
  getFutureTickets
}