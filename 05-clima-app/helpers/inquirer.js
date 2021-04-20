const inquirer = require("inquirer");
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Selecciona una opción',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 3,
                name: `${'3.'.green} Salir`
            }
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

const listarLugares = async( lugares = [] ) => {
    
    // map() retorna un nuevo arreglo transformando los valores del arreglo actual
    const choices = lugares.map( (lugar, i ) => {
        
        const index = `${i + 1}`.green;
        // Como van a lucir los nuevos items del arreglo
        return {
            value: lugar.id,
            name: `${ index }. ${ lugar.nombre }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntasListar = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccionar lugar: ',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt( preguntasListar );

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
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}