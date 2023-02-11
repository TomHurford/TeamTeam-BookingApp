// Past events page controllers
//
// Compare this snippet from api/src/controllers/past.js:
// // controller to get past events for a user to display on the past events page for a user on the front end
// // Path: api/src/controllers/past.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getPastEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          lt: new Date()
        }
      }
    })
    res.json(events)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getPastEvents
}
//