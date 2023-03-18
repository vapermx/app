'use strict'
require('dotenv').config();
const { validationResult } = require('express-validator');
var OthersUtils = require('../utils/others');
var VtexUtils = require('../utils/vtex');

var OrdersModel = require('../models/orders');

var controller = {

  starting: (req, res) => {

    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;
    let userId = req.decoded.user_id;

    //Iniciamos el reparto de una orden

    let orderId = params.OrderId;

    //Validamos si el usuario ya esta en un reparto
    OrdersModel.findOne({'delivery.userId': userId, active: { $ne: 5 }}).exec(async (err, order) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!order){

        //Registramos el reparto de una orden con un Usuario

        //Cambiamos el estado de la orden a handly
        let starthandling = await VtexUtils.starthandling(orderId).then( (result) => {
          return result;
        });
        if(starthandling.status != 204){
          return res.status(starthandling.status).send({
            status: starthandling.status,
            message: starthandling.message
          });
        }

        var update = {
          active: 2,
          delivery : {
            userId: userId,
            history: [
              {
                event: "starting",
                date: OthersUtils.get_Date()
              }
            ]
          }
        };

        OrdersModel.findOneAndUpdate({orderid: orderId, active: 1}, update, {new:true}, (err, orderUpdate) => {
          if(err) return res.status(500).send({status: 500, message: err});

          if(!orderUpdate) return res.status(404).send({status: 404, message: 'La orden no puede ser asignada.'});

          //Notificamos al usuario por sms que su envio sera entregado
          OthersUtils.send_sms("¡"+orderUpdate.name+"! Estamos recolectando tus productos. Te notificaremos cuando el repartidor salga.", orderUpdate.phone);

          return res.status(200).send({
            status: 200,
            message: 'La orden se ha asignado correctamente.'
          });

        });

      }else{

        return res.status(403).send({status: 403, message: 'El usuario ya se encuentra procesado una orden.'});

      }

    });


  },

  colect: async (req, res) => {

    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;
    let userId = req.decoded.user_id;
    let existence;
    let no_existence;
    let orderId = params.OrderId;

    //Validamos los items recolectado y los que no

    if(!Array.isArray(params.items_pickup.existence)){

      return res.status(500).send({
        status: 500,
        message: 'Los items existentes no estan en formato de array.'
      });

    }else{
      existence = params.items_pickup.existence;
    }

    if(params.items_pickup.no_existence != null){
      if(!Array.isArray(params.items_pickup.no_existence)){

        return res.status(500).send({
          status: 500,
          message: 'Los items no existentes no estan en formato de array.'
        });

      }else{

        let arr_no_existence = params.items_pickup.no_existence;

        if( arr_no_existence.length > 0 ){

          OrdersModel.findOne({'delivery.userId': userId}).exec((err, order) => {

              OthersUtils.send_sms("Algunos items de la orden "+orderId+" no estan disponibles tu repartidor se comunicara de inmediato.", order.phone);


          });

          no_existence = params.items_pickup.no_existence;

        }

      }
    }else{
      no_existence = [];
    }

    //Obtenemos el history
    let order_process = await OrdersModel.findOne({orderid: orderId, 'delivery.userId': userId, active: 2}).exec();
    if(!order_process) return res.status(404).send({message: 'La orden no puede ser colectada.'});

    let hisotry = order_process.delivery.history;

    hisotry.push(
      {
        event: "Colect",
        date: OthersUtils.get_Date()
      }
    );

    //almacenamos lo colectado y lo que no, ademas  cambiamos el estado de la orden
    let code_n = OthersUtils.get_token();
    var update = {
      active: 3,
      delivery : {
        userId: order_process.delivery.userId,
        code_track: code_n,
        history: hisotry,
        items_pickup: {
            existence: existence,
            no_existence: no_existence
        }
      }
    };

    OrdersModel.findOneAndUpdate({orderid: orderId, 'delivery.userId': userId, active: 2}, update, {new:true}, (err, orderUpdate) => {
      if(err) return res.status(500).send({status: 500, message: err});

      if(!orderUpdate) return res.status(404).send({status: 404, message: 'No se puede asignar items a la orden.'});

      //Notificamos al usuario por sms que su envio sera entregado
      OthersUtils.send_sms("Listo "+orderUpdate.name+"!!, estamos corriendo al punto de entrega. Haz clic en el enlace para rastrear tu pedido en tiempo real. Por favor muestra el siguiente código al repartidor "+code_n+". https://www.vaperstudiomx.com/tracker-order?orderId="+orderUpdate.orderid, orderUpdate.phone);

      return res.status(200).send({
        status: 200,
        message: 'Los items de la orden fueron recolectados.'
      });

    });


  },

  receive: async(req, res) => {

    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;
    let userId = req.decoded.user_id;
    let orderId = params.OrderId;

    OrdersModel.findOne({orderid: params.OrderId, 'delivery.userId': userId, 'delivery.code_track': params.code_track, active: 3}).exec((err, orders) => {

      if(err) return res.status(500).send({status:500, message: "Error al devolver los datos."});
      if(!orders) return res.status(404).send({status: 404, message: "La orden no puede ser confirmada"});


      let hisotry = orders.delivery.history;

      hisotry.push(
        {
          event: "Receive",
          date: OthersUtils.get_Date()
        }
      );

      var update = {
        active: 4,
        delivery : {
          userId: orders.delivery.userId,
          code_track: orders.delivery.code_track,
          history: hisotry,
          items_pickup: {
              existence: orders.delivery.items_pickup.existence,
              no_existence: orders.delivery.items_pickup.no_existence
          }
        }
      };

      OrdersModel.findOneAndUpdate({orderid: params.OrderId, 'delivery.userId': userId, 'delivery.code_track': params.code_track, active: 3}, update, {new:true}, async (err, orderUpdate) => {
        if(err) return res.status(500).send({status: 500, message: err});

        if(!orderUpdate) return res.status(404).send({status: 404, message: 'No se puede entregar el pedido.'});

        //Notificamos al usuario por sms que su envio sera entregado
        OthersUtils.send_sms("La orden "+orderId+" fue entregada , agradecemos mucho tu compra. ¡Nos vemos en la siguiente!!", orders.phone);

        //Cambiamos el estado de la orden a invoiced
        //Solicitamos el detalle de la orden de la api de vtex
  			var orderdetail = await VtexUtils.orderdetail(orderId).then( (result) => {
  				return result;
  			});
  			if(orderdetail.status != 200){

  				return res.status(orderdetail.status).send({
  					status: orderdetail.status,
  					message: orderdetail.body
  				});

  			}

        let json_invoiced = {
    			SalesOrder: orderId,
          OrderNumber: orderId,
    	    issuanceDate: orderdetail.body.creationDate,
    	    invoiceValue: orderdetail.body.value
    		}

        let changeorder = await VtexUtils.changeOrderStatus(json_invoiced).then( (result) => {
    			return result;
    		});
    		if(changeorder.status != 200){
    			return res.status(changeorder.status).send({
    				status: changeorder.status,
    				message: changeorder.message
    			});
    		}

        return res.status(200).send({
          status: 200,
          message: 'Muchas gracias por su compra, por favor nos apoyaria con sus comentarios.'
        });

      });


    });

  },

  comment: (req, res) => {

    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;
    let userId = req.decoded.user_id;
    let orderId = params.OrderId;

    OrdersModel.findOne({orderid: params.OrderId, 'delivery.userId': userId, 'delivery.code_track': params.code_track, active: 4}).exec((err, orders) => {

      if(err) return res.status(500).send({status:500, message: "Error al devolver los datos."});
      if(!orders) return res.status(404).send({status: 404, message: "No se puede insertar un comentario a la orden"});


      let hisotry = orders.delivery.history;

      hisotry.push(
        {
          event: "Comment",
          date: OthersUtils.get_Date()
        }
      );

      var update = {
        active: 5,
        delivery : {
          userId: orders.delivery.userId,
          code_track: orders.delivery.code_track,
          history: hisotry,
          items_pickup: {
              existence: orders.delivery.items_pickup.existence,
              no_existence: orders.delivery.items_pickup.no_existence
          },
          comment: params.comment,
          stars: params.stars
        }
      };

      OrdersModel.findOneAndUpdate({orderid: params.OrderId, 'delivery.userId': userId, 'delivery.code_track': params.code_track, active: 4}, update, {new:true}, (err, orderUpdate) => {
        if(err) return res.status(500).send({status: 500, message: err});

        if(!orderUpdate) return res.status(404).send({status: 404, message: 'No se puede agregar un comentario al pedido.'});

        //Notificamos al usuario por sms que su envio sera entregado
        OthersUtils.send_sms("Ayúdanos a crecer calificando nuestro servicio en google. https://g.page/r/CepZcK1xCH0vEAg/review", orders.phone);

        return res.status(200).send({
          status: 200,
          message: 'Muchas gracias por sus comentarios.'
        });

      });

    });

  },

  cancel_delivery: async (req, res) => {
    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;
    let userId = req.decoded.user_id;

    OrdersModel.findOne({'delivery.userId': userId, active: { $ne: 5 }}).exec((err, order) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!order) return res.status(500).send({message: 'No es posible cancelar la orde.'});


      var update = {
        active: 5,
        user_cancel: true,
      };
      OrdersModel.findOneAndUpdate({orderid: params.OrderId, 'delivery.userId': userId, active: { $ne: 5 }}, update, {new:true}, (err, orderUpdate) => {
        if(err) return res.status(500).send({status: 500, message: err});

        if(!orderUpdate) return res.status(404).send({status: 404, message: 'No se puede agregar un comentario al pedido.'});

        //Notificamos de la cancelacions
        OthersUtils.send_sms("La entrega de la orden "+params.OrderId+" fue cancelada nos comunicaremos contigo.", order.phone);

        return res.status(200).send({
          status: 200,
          message: 'La orden fue cancelada.'
        });

      });

    });

  },

  show_map: async (req, res) => {

    //Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let params = req.body;

    //Validamos que la orden este en el estado 3 que es cuando ya se recogio y se va rumbo a casa del cliente
    OrdersModel.findOne({orderid: params.OrderId, active: 3 }).exec((err, order) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!order) return res.status(400).send({status:400, map: false, message: 'La orden aun no esta en reparto.'});

      return res.status(200).send({status:200, map: true, message: 'La orden esta en reparto.'});

    });


  }

};

module.exports = controller;
