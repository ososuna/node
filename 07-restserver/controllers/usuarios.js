
const { response } = require('express');

const bcryptjs = require('bcryptjs');

const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');

const usuariosGet = ( req, res = response ) => {
    
    const { q, nombre = 'No name', token, page = 1, limit } = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        token,
        page,
        limit
    });

}

const usuariosPost = async ( req, res = response ) => {
    
    // Errores del Middleware express-validator
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) return res.status( 400 ).json( errors ); 

    // Extraer body
    const { nombre, correo, password, rol } = req.body;

    // Creación de la instancia
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    
    if ( existeEmail ) return res.status(400).json({
       msg: 'El correo ya está registrado' 
    });

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

const usuariosPut = ( req, res = response ) => {
    
    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });

}

const usuariosDelete = ( req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });

}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}