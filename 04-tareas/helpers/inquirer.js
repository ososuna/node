const inquirer = require("inquirer");
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const preguntaPausa = [
    {
        type: 'input',
        name: 'pausa',
        message: `Presiona ${ 'enter'.rainbow } para continuar`
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opción'.white);
    console.log('======================\n'.green);

    const { opcion } = await inquirer.prompt( preguntas );

    return opcion;
}

const pause = async() => {
    await inquirer.prompt( preguntaPausa );
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingresa un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt( question );
    return desc;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    
    // map() retorna un nuevo arreglo transformando los valores del arreglo actual
    const choices = tareas.map( (tarea, i ) => {
        
        const index = `${i + 1}`.green;
        // Como van a lucir los nuevos items del arreglo
        return {
            value: tarea.id,
            name: `${ index }. ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntasBorrar = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt( preguntasBorrar );

    return id;

}

const confirmar = async( message ) => {
    
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    
    const { ok } = await inquirer.prompt( question );
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    
    // map() retorna un nuevo arreglo transformando los valores del arreglo actual
    const choices = tareas.map( (tarea, i ) => {
        
        const index = `${i + 1}`.green;
        // Como van a lucir los nuevos items del arreglo
        
        return {
            value: tarea.id,
            name: `${ index }. ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntasChecklist = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    
    const { ids } = await inquirer.prompt( preguntasChecklist );

    return ids;

}

module.exports = {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}