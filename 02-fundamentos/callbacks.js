// Cuando una función recibe un callback no es más que una función
// que se va a ejecutar después en cierto punto del tiempo

const getUsuarioById = ( id, callback ) => {

    const usuario = {
        id,
        nombre: 'Oswaldo'
    }

    // setTimeout() es una función que ejecuta un callback en cierto momento del tiempo
    setTimeout(() => {
        callback( usuario );
    }, 1000);

}

getUsuarioById( 10, ( usuario ) => {
    console.log( usuario.id );
    console.log( usuario.nombre.toUpperCase() );
});
