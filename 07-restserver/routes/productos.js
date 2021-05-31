
const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', obtenerProductos );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProductoPorId );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoría es obligatoria').not().isEmpty(),
    validarCampos
], crearProducto );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    validarJWT,
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto )

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    validarJWT,
    esAdminRole,
    check('id').custom( existeProducto ),
    validarCampos
], eliminarProducto )

module.exports = router;