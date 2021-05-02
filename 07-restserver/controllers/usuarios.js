const { response } = require('express');

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

const usuariosPost = ( req, res = response ) => {
    
    // Extraer body
    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
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