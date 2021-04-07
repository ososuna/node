const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors/safe'); 

console.clear();

crearArchivo( argv.b, argv.l, argv.h )
    .then( nombreArchivo => console.log(colors.green(nombreArchivo), 'creado') )
    .catch( err => console.log( err ) );

