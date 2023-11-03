const { v4: uuidv4 } = require('uuid');

class Ticket {
  constructor(ticketNumber) {
    this.id = uuidv4();
    this.ticketNumber = ticketNumber;
    this.desktop = null;
    this.agent = null;
  }

}

module.exports = Ticket;
