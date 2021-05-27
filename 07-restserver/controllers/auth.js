
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

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

const googleSignIn = ( req = request, res = response ) => {

    const { id_token } = req.body;

    res.json({
        msg: 'Ok Google SignIn',
        id_token
    });

}

module.exports = {
    login,
    googleSignIn
}