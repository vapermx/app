/*const app = require ('/home/vsmx/app/app.js');
const { connect } = require('/home/vsmx/app/server.js')


async function main(){
	await connect();
	
	await app.listen(4000);
	console.log('Server on port 4000');
}


main();*/
//'use strict'
//import Socket;
require('dotenv').config();
//var mongoose = require('mongoose');
var app = require('./app.js');
var port = app.get('port');
//const http = require('http').Server(app);
var fs = require('fs');
var http = require('http').Server(app);
const { Server } = require('socket.io');
const io = new Server(http);
const WebSocket = require('ws');
//mongoose.Promise =  global.Promise;
//const sdk = require('api')('@vtex-rest-api/v2.1#12cdkl4x6r7yw');

/*const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);*/

async function main()  {
	
	 /*await mongoose.connect( 'mongodb://'+process.env.OD+'/'+process.env.DB_NAME , { useNewUrlParser: true, useUnifiedTopology: true})
	        .then(async () => {*/

	          //console.log( 'Conexión a la base de datos establecida con éxito' );

	          
	          //require('./sockets')(io);
	          io.on("connection", socket => {
	          	console.log('a user connected');
	          	/*socket.on("position-change", (data) => {
	          		io.emit("position-change", data);
	          		console.log("wtf");
	          	});*/
	          	socket.on("location", (arg) => {
				    console.log(arg); // world
				  });

	          	socket.on("disconnect", () => {
	          		console.log("Disconnected");
	          	});
	          });

	      		const port = 8080;
            const wss = new WebSocket.Server({ port: port }); console.log('[WebSocket] Starting WebSocket server on localhost:'+port+'');
            wss.on("connection", (ws, request) => { const clientIp = request.connection.remoteAddress;
              console.log('[WebSocket] Client with IP '+clientIp+' has connected'); ws.send('Thanks for connecting to this nodejs websocket server');
              //Broadcast aka send messages to all connected clients 
              ws.on("message", (message) => { wss.clients.forEach((client) => { if (client.readyState === WebSocket.OPEN) { client.send(message); } 
          		}); console.log('[WebSocket] Message '+message+' was received');
             });
            });


	          //Creacion del servidor
	           await http.listen(4000, () => {
	            console.log("Servidor corriendo correctamente en la url: localhost:"+port);
	          });

	           /*https.createServer({
				   cert: fs.readFileSync('/home/vsmx/app/public/cert.pem'),
				   key: fs.readFileSync('/home/vsmx/app/public/key.pem')
				 },app).listen(4000, function(){
					console.log('Servidor https correindo en el puerto 443');
				});*/

	        /*})
	        .catch(err => console.log(err));*/

}


main().catch(err => console.log(err));