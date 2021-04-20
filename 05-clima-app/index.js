require('dotenv').config()

const { leerInput, inquirerMenu, pause, listarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');


const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        
        switch ( opt  ) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad( termino );

                // Seleccionar el lugar
                const id = await listarLugares( lugares );
                const lugarSel = lugares.find( l => l.id === id );

                // Clima

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log( 'Ciudad:',  lugarSel.nombre);
                console.log( 'Lat:',  lugarSel.lat);
                console.log( 'Lng:',  lugarSel.lng);
                console.log( 'Temperatura:',  );
                console.log( 'Mínima:',  );
                console.log( 'Máxima:',  );
                break;
            
            default:
                break;
        }

        if ( opt !== 3 ) await pause();
    } while ( opt !== 3 );

}

main();