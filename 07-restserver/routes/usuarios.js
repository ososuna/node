
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get( '/', usuariosGet );

// Arreglo de Middlewares - Segundo argumento
router.post( '/', [
    // Almacena todos los errores para manejarlos en el controlador
    check('correo', 'El correo no es válido').isEmail(),
], usuariosPost );

router.put( '/:id', usuariosPut );

router.delete( '/', usuariosDelete );

module.exports = router;