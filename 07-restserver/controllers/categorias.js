
const { request, response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async ( req = request, res = response ) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .skip(Number( skip ))
            .limit(Number( limit ))
            .populate('usuario', 'nombre')
    ])

    res.json({
        total,
        categorias
    })

}

const obtenerCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;
 
    categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    res.json({
        categoria
    })

}

const crearCategoria = async ( req = request, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoría ${ categoriaDB.nombre } ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json( categoria );

}

// actualizarCategoria
const actualizarCategoria = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { usuario, estado, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    res.json({ categoria });

}

// borrarCategoria - estado:false
const borrarCategoria = async ( req = request, res = response ) => {
 
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );
 
    res.json({ categoria });

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
