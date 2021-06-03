
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async ( req = request, res = response ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({ msg: 'No hay archivos en la petición' });
    }

    // Imágenes
    const nombre = await subirArchivo( req.files );

    res.json({
        nombre
    })

} 

module.exports = {
    cargarArchivo
}