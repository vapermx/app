'use strict'
require('dotenv').config();
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.APP_PORT;
const http = require('http').Server(app);
const io = require('socket.io')(http);

mongoose.Promise =  global.Promise;
mongoose.connect( 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {

          console.log( 'Conexión a la base de datos establecida con éxito' );

          //import Socket
          require('./sockets')(io);

          //Creacion del servidor
          http.listen(port, () => {
            console.log("Servidor corriendo correctamente en la url: localhost:"+port);
          });

        })
        .catch(err => console.log(err));
