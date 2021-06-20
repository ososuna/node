
const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
    
    socket.emit('ultimo-ticket', ticketControl.ultimo );

    socket.on('disconnect', () => {});

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        // TO DO: Notificar que hay un nuevo ticket pendiente de asignar

    });

    socket.on( 'atender-ticket', ( { escritorio }, callback ) => {
        
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es oblogatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

        // TO DO: Notificar cambio en los últimos 4

        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}

