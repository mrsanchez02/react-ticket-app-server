const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastTicket = 0;
    this.pending = [];
    this.assigned = [];
  }

  get nextNumber() {
    this.lastTicket++;
    return this.lastTicket;
  }

  get last13() {
    return this.assigned.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pending.push(newTicket);
    return newTicket;
  }

  asignTicket(agent, desktop) {
    if (this.pending.length === 0) return null;
    
    const nextTicket = this.pending.shift();
    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.assigned.unshift(nextTicket);
    return nextTicket;
  }

}

module.exports = TicketList;
