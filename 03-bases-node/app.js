const { options } = require('yargs');
const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true        
    })
    .check( (argv) => {
        if ( isNaN( argv.b ) ) {
            throw 'La base tiene que ser un número';
        }
        return true;
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false
    })
    .argv;

console.clear();

crearArchivo( argv.b, argv.l )
    .then( nombreArchivo => console.log(nombreArchivo, 'creado') )
    .catch( err => console.log( err ) );

