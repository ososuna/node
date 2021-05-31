
const { request, response } = require('express');
const { Producto, Categoria } = require('../models');

const obtenerProductos = async ( req = request, res = response ) => {

    const { limit = 5, skip = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .skip(Number( skip ))
            .limit(Number( limit ))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        productos
    });

}

const obtenerProductoPorId = async ( req = request, res = response ) => {

    const { id } = req.params;
 
    producto = await Producto.findById( id ).populate('usuario', 'nombre');

    res.json({
        producto
    })

}

const crearProducto = async ( req = request, res = response ) => {

    const { nombre, categoria, ...data } = req.body;

    data.nombre = nombre.toUpperCase();

    const productoDB = await Producto.findOne({ nombre: data.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        });
    }

    data.categoria = await Categoria.findOne({ nombre: categoria });
    data.usuario = req.usuario._id;

    const producto = new Producto( data );

    await producto.save();

    res.status(201).json( producto );

}

const actualizarProducto = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { usuario, estado, ...data } = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.json({ producto });

}

const eliminarProducto = async ( req = request, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } )

    res.json( producto );
    
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
}