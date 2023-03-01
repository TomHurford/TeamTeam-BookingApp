
const jwt = require("./jwt.js");

const generateTickets = async (event, ticketTypes, tickets) => {

    // Check Logged In
    var isLoggedIn = false;

    await jwt.checkIsLoggedIn().then((res) => {if (res) {isLoggedIn = res;}});

    if (!isLoggedIn) {
        return 0;
    }

    // Create tickets for each.

    if (event.id != ticketTypes[0].eventId) {
        return 0;
    }

    var token = jwt.getToken();

    ticketTypes.map((ticketType) => {
        //make tickets for ticketype

        var quantity = tickets[ticketType.id]
        // (user token, ticketType, quantity) => API
        
        // for (let i = 0; i < tickets[ticketType.id]; i++) {
             
        // }
        token;
        quantity;
    });

}


module.exports = {
    generateTickets
  };
  