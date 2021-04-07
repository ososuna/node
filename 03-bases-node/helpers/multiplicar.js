const fs = require('fs');
const colors = require('colors/safe');

const crearArchivo = async ( base, listar, hasta ) => {
    try {
        let salida = '';
        let consola = '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${ base } * ${ i } = ${ base*i }\n`;
            consola += `${ colors.red(base) } * ${ colors.blue(i) } = ${ colors.yellow(base*i) }\n`;
        }

        if ( listar ) {
            console.log('=================');
            console.log('Tabla del', colors.red(base));
            console.log('=================');
            console.log( consola );
        }
        const nombreArchivo = `tabla-${ base }.txt`;
        fs.writeFileSync( `./salida/${ nombreArchivo }`, salida );
        return nombreArchivo;
    } catch ( err ) {
        throw err;
    }
}

module.exports = {
    crearArchivo
}