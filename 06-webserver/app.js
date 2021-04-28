require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT;


// Handlebars
app.set('view engine', 'hbs');
// Parciales
hbs.registerPartials(__dirname + '/views/partials',  ( err ) => {
    console.log( err );
});

// Servir contenido estático
// Middleware
app.use( express.static('public') );

// Renderizar vista hbs
app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Oswaldo Osuna',
        titulo: 'Curso de Node'
    });
});

// Definir ruta
app.get('/generic', (req, res) => {
    res.render('generic');
});

// Definir ruta
app.get('/elements', (req, res) => {
    res.render('elements');
});

// Definir ruta
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});  
 
app.listen( port, () => {
    console.log( `App corriendo en el puerto ${ port }` );
});