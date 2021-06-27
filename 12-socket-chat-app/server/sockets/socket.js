
const { io } = require('../server');
const Usuarios = require('../classes/usuarios');
const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', ( client ) => {

    client.on('entrarChat', ( usuario, callback ) => {
        
        if ( !usuario.nombre ) {
            return callback({
                error: true,
                msg: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agregarPersona( client.id, usuario.nombre );

        client.broadcast.emit( 'listaPersonas', usuarios.getPersonas() );

        return callback( personas );
    });

    client.on('crearMensaje', data => {

        let persona = usuarios.getPersona( client.id );

        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.emit( 'crearMensaje', mensaje );
    
    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona( client.id );

        client.broadcast.emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } salió`));
        client.broadcast.emit( 'listaPersonas', usuarios.getPersonas() );

    });

    // Mensajes privados
    client.on('mensajePrivado', data => {
        
        let persona = usuarios.getPersona( client.id );
        client.broadcast.to(data.para).emit( 'mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );
    
    });

});