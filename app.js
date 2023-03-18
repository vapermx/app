//'use strict'
require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
//var FiBs = require('/home/vsmx/app/config');
const exphbs = require('express-handlebars');

const app = express();

app.use(fileUpload());

//settings
app.set('port', process.env.APP_PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//app.use(bodyParser.json());
// Will handle text/plain requests
//app.use(bodyParser.text());

//cargar archivos de rutas
app.use(require('./routes/api'));

// Configurar cabeceras y cors
app.use(cors());



//Errores en el json
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message });
    }
    next();
});

//static files
app.use(express.static(path.join(__dirname,'public')));


//exportar
module.exports = app;