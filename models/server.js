// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');
const Sockets  = require('./sockets');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // sockets configurations.
        this.io = socketio( this.server, { /* configuraciones */ } );
        
        // Start Sockets
        this.sockets = new Sockets( this.io );
    }

    middlewares() {
        // Deploy public directory
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

        // Get last tickets.
        this.app.get('/api/last-tickets', (_, res) => {
            res.json({
                ok: true,
                lastTickets: this.sockets.TicketList.last13
            })
        })

    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server running on port:', this.port );
        });
    }

}


module.exports = Server;