
const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener todas las categorías - público
router.get('/', obtenerCategorias );

// Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria );

// Crear categoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar categoría por id - privado - cualquier persona con un token válido
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria );

// Eliminar una categoría - privado - admin
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos,
    validarJWT,
    esAdminRole,
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria );

module.exports = router;