
const { Categoria, Producto, Role, Usuario } = require('../models');

const esRolValido = async ( rol = '' ) => {
        
    const existeRol = await Role.findOne({ rol });
    
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la base de datos`)
    }

}

const emailExiste = async ( correo = '' ) => {
    
    const existeEmail = await Usuario.findOne({ correo });
    
    if ( existeEmail ) {
        throw new Error(`El correo '${ correo }' ya está registrado`)
    }

}

const existeUsuarioPorId = async ( id = '' ) => {
    
    const existeUsuario = await Usuario.findById( id );
    
    if ( !existeUsuario ) {
        throw new Error(`El id '${ id }' no existe`)
    }

}

const existeCategoria = async ( id = '' ) => {

    const categoriaExiste = await Categoria.findById( id );

    if ( !categoriaExiste ) {
        throw new Error(`El id '${ id }' no existe`)
    }

}

const existeProducto = async ( id = '' ) => {

    const productoExiste = await Producto.findById( id );

    if ( !productoExiste ) {
        throw new Error(`El id '${ id }' no existe`)
    }

}

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );

    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }

    return true;

}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}