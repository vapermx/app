'use strict'
require('dotenv').config();
var OrdersModel = require('./models/orders');

module.exports = io => {

  io.on("connection", socket => {

    console.log('new socket connected');

    socket.on('initRoom_Home', (orderid) => {
      const room = orderid;

      socket.join(room);

      //Obtenemos las cordenadas del clientes
  		OrdersModel.findOne({orderid: orderid}).exec(async (err, orders) => {

        if(err){
          console.log("Error al devolver los datos.");
          return socket.emit('error', 'Error al devolver los datos.');
        }

        if(!orders){
          console.log("La orden "+orderid+" no puede ser rastreada.");
          return socket.emit('error', 'La orden '+orderid+' no puede ser rastreada.');
        }

        let c_data = {
          orderid: orderid,
          coords: {
            lat: orders.address.geoCoordinates[1],
            lng: orders.address.geoCoordinates[0]
          }
        }
        console.log(c_data);
        // Welcome current user
        socket.emit('message', 'Welcome to trackig!');

        socket.emit('LoadMap', c_data);
      });

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          `${room} has joined the trackig`
        );

    });

    socket.on('initRoom_Moto', (orderid) => {
      const room = orderid;

      socket.join(room);

      // Welcome current user
      socket.emit('message', 'Welcome to trackig!');

      // Broadcast when a user connects
      socket.broadcast
        .to(room)
        .emit(
          'message',
          `${room} moto conectada para emitir gps`
        );

    });

    socket.on('sendMotoCoordinates', (c_data) => {
      console.log("sendMotoCoordinates");
      console.log(c_data);

      //Actulizamos el status en cada envio de datos

      socket.broadcast.to(c_data.orderid).emit('NewMotoCoordinates', c_data.coords);

    });

    socket.on('sendupdateMotoCoordinates', (c_data) => {
      console.log("sendupdateMotoCoordinates");
      console.log(c_data);

      //Actulizamos el status en cada envio de datos
      socket.broadcast.to(c_data.orderid).emit('updateMotoCoordinates', c_data.coords);

    });

  });


};
