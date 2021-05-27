
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ) return res.status( 400 ).json({
            msg: 'El usuario o contraseña son incorrectos - correo'
        })

        // Si el usuario está activo
        if ( !usuario.estado ) return res.status( 400 ).json({
            msg: 'El usuario o contraseña son incorrectos - estado: false'
        })

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) return res.status( 400 ).json({
            msg: 'El usuario o contraseña son incorrectos - password'
        })

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch ( error ) {
        
        console.log( error );
        
        res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
}

const googleSignIn = async ( req = request, res = response ) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Crear usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
             });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
            
    } catch ( error ) {
        
        res.status(400).json({
            msg: 'Token de Google no válido'
        });
        
    }

}

module.exports = {
    login,
    googleSignIn
}