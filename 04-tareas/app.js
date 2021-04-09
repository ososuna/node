require('colors');
const { inquirerMenu, pause, leerInput } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();

    do {
        console.log('\n');
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                console.log( tareas._listado );
                break;
            case '3':
                
                break;
            case '4':
            
                break;
            case '5':
        
                break;
            case '6':
    
                break;
            case '7':
                
                break;
            default:
                break;
        }

        if( opt !== '0' ) await pause();
    } while ( opt !== '0' );
    
}

main();