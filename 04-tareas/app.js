require('colors');
const { inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const main = async () => {
    
    let opt = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();
    
    if ( tareasDB ) {
        // Establecer las tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        console.log('\n');
        // Imprimir el menú
        opt = await inquirerMenu();

        switch ( opt ) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea( desc );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas( false );
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Estás seguro?');
                    if ( ok ) tareas.borrarTarea( id );                    
                }
                break;
            case '7':
                
                break;
            default:
                break;
        }

        // Guardar el arreglo de tareas
        guardarDB( tareas.listadoArr );

        if( opt !== '0' ) await pause();
    } while ( opt !== '0' );
    
}

main();