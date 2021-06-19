
// referencias del html
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

// socket del cliente
const socket = io();

// listeners - escuchar un evento
socket.on('connect', () => {
    console.log('Conectado');
    
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

// listener del emit del server
socket.on('enviar-mensaje', ( payload ) => {
    console.log( payload );
});

btnEnviar.addEventListener( 'click', () => {
    
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123456',
        fecha: new Date().getTime()
    }
    
    // emits - emitir un evento
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id);
    });

});
