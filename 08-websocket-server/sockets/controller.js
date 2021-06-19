
const socketController = ( socket ) => {
    
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });

    // socket hace referencia al cliente que está conectado
    // listener del emit del cliente
    socket.on('enviar-mensaje', ( payload, callback  ) => {
        
        const id = 123456;
        callback( id );
        
        // emit del servidor
        socket.broadcast.emit('enviar-mensaje', payload);
    });

}

module.exports = {
    socketController
}