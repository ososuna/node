
const { response } = require('express');

const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async ( req, res = response ) => {
    
    const { limit = 5, skip = 0 } = req.query;

    // Se agrega la condición para contar únicamente los usuarios activos
    const query = { estado: true };

    // Promise.all() permite mandar un arreglo con todas las promesas a ejecutar
    const [ total, usuarios ] = await Promise.all([
        // Se ejecutan las promesas de manera simultánea, es útil ya que una no depende de otra
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( skip ))
            .limit(Number( limit ))
    ])

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async ( req, res = response ) => {
    
    // Extraer body
    const { nombre, correo, password, rol } = req.body;

    // Creación de la instancia
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar el objeto en la base de datos
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });

}

const usuariosPut = async ( req, res = response ) => {
    
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    
    // Validar con la base de datos
    if ( password ) {
        
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({ usuario });

}

const usuariosDelete = async ( req, res = response ) => {
    
    const { id } = req.params;

    // Eliminar físicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )

    res.json({
        usuario
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}