const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {
        this.io = io;
        this.TicketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            socket.on('request-ticket', (_, callback) => {
                const newTicket = this.TicketList.createTicket();
                callback(newTicket);
            })

            socket.on('next-ticket', ({agent, desktop}, callback) => {
                const nextTicket = this.TicketList.asignTicket(agent, desktop);
                callback(nextTicket);
                this.io.emit('assigned-tickets', this.TicketList.last13);
            })
            
        });
    }

}

module.exports = Sockets;