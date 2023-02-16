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
    const futureTickets = await prisma.purchase.findMany({
      where: {
        userId: userId,
        event: {
          date: {
            gte: new Date()
          }
        }
      }
    })

    console.log("futureTickets: ", futureTickets)
    res.status(200).send({ futureTickets: futureTickets });
  } catch (err) {
    console.log(err)
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}
    

module.exports = {
  getPastPurchases,
  getFutureTickets
}