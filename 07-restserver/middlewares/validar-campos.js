
const { validationResult } = require('express-validator');

// Middleware para validar los campos
const validarCampos = ( req, res, next ) => {
    
    // Errores del Middleware express-validator
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) return res.status( 400 ).json( errors ); 
    
    // Si se llega hasta este punto sigue con el siguiente middleware
    next();
}

module.exports = {
    validarCampos
}