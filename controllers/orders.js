'use strict'
require('dotenv').config();
const OneSignal = require('onesignal-node');
const client = new OneSignal.Client(process.env.OneSignal_Account,process.env.OneSignal_Token);
const { validationResult } = require('express-validator');
var VtexUtils = require('/home/vsmx/app/utils/vtex');
var OthersUtils = require('/home/vsmx/app/utils/others');

var OrdersModel = require('/home/vsmx/app/models/orders');
var WarehousesModel = require('/home/vsmx/app/models/warehouses');

var controller = {
  //Nueva orden se procesa
	new: async function(req, res){

		//Validamos los datos que se envian al endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array() });
    }

		var params = req.body;

		//Validamos si la orden ya ue enviada
		OrdersModel.findOne({orderid: params.OrderId}).exec(async (err, orders) => {

			if(err) return res.status(500).send({status:500, message: "Error al devolver los datos."});
			if(orders) return res.status(404).send({status: 404, message: "La orden ya ha sido procesada con anterioridad."});

			//Solicitamos el detalle de la orden de la api de vtex
			var orderdetail = await VtexUtils.orderdetail(params.OrderId).then( (result) => {
				return result;
			});

			//Validamos la respuesta de la api de vtex
			if(orderdetail.status != 200){

				return res.status(orderdetail.status).send({
					status: orderdetail.status,
					message: orderdetail.body
				});

			}

			//Validamos si la orden esta en ready-for-handling
			if(orderdetail.body.status != "ready-for-handling"){
				return res.status(403).send({
					status: 403,
					message: 'La orden no esta en ready-for-handling'
				});
			}

			//Determinamos la ciudad
			let f_city = orderdetail.body.shippingData.address.state;
			let f_gps_cliente = orderdetail.body.shippingData.address.geoCoordinates;
			let name_paqueteria = orderdetail.body.shippingData.logisticsInfo[0].selectedSla;
			//validamos si hay servicio en el area de la orden
			let warehouse = await WarehousesModel.findOne({"city": { $regex: new RegExp("CIUDAD DE MÉXICO", "i")}, name: name_paqueteria}).exec();
			if(!warehouse){
				return res.status(400).send({
					status: 400,
					message: 'Esta orden no puede usar esta paqueteria.'
				});
			}

			//Calculamos la distancia de la entrega
			let d_km = OthersUtils.getKilometros(warehouse.gps_lat,warehouse.gps_log,f_gps_cliente[1],f_gps_cliente[0]);

			//Alamcenamos la orden que se recibio en base de datos
			var orders_model = new OrdersModel();

			orders_model.orderid = orderdetail.body.orderId;
			orders_model.name = orderdetail.body.clientProfileData.firstName+" "+orderdetail.body.clientProfileData.lastName
			orders_model.phone = orderdetail.body.clientProfileData.phone;
			orders_model.address = orderdetail.body.shippingData.address;
			orders_model.distancia = d_km;
			orders_model.price = (orderdetail.body.value / 100);
			orders_model.items = orderdetail.body.items;
			orders_model.creationDate = orderdetail.body.creationDate;
			orders_model.active = 1;

			let saveOrder = await orders_model.save();

			//Notificamos al usuario
			OthersUtils.send_sms("¡Hola "+orderdetail.body.clientProfileData.firstName+" "+orderdetail.body.clientProfileData.lastName+"! Bienvenido a Vaper Studio MX, tu orden está en proceso.", orderdetail.body.clientProfileData.phone);

			//Notificamos de la solicitud de envio
	    const notification = {
	      contents: {
	        'en': 'Nueva orden realizada '+params.OrderId,
	      },
	      included_segments: [warehouse.push_included_segments],
	      filters: []
	    };

	    try {

	      const response = await client.createNotification(notification);

	      return res.status(200).send({
	        status: 200,
	  			message: 'Notificacion creada'
	  		});

	    } catch (e) {

	      if (e instanceof OneSignal.HTTPError) {

	        return res.status(e.statusCode).send({
	          status: e.statusCode,
	    			message: 'Error en el envio de la notification'
	    		});

	      }

	    }


		});

	},

	list: function(req, res){

		OrdersModel.find({active: 1}, ['-_id','-name','-items','-price','-active']).exec((err, orders) => {

      if(err) return res.status(500).send({status:500, message: 'Error al devolver los datos.'});

      if(!orders) return res.status(404).send({status: 404, message: 'No existen ordenes disponibles.'});

      return res.status(200).send({
				status: 200,
				data: orders
			});

    });

	},

	get_order: function(req, res){

		let orderid = req.params.orderid;

		OrdersModel.findOne({orderid: orderid, active: 2}, '-_id').exec((err, order) => {

      if(err) return res.status(500).send({status:500, message: 'Error al devolver los datos.'});

      if(!order) return res.status(404).send({status: 404, message: 'El numero de orden no existe o ya fue atendido.'});

      return res.status(200).send({
				status: 200,
				data: order
			});

    });
	}

};

module.exports = controller;
