'use strict'
require('dotenv').config();
const { VTEX } = require('@onreadydesa/vtex-node-sdk');
const vtexSDK = new VTEX(process.env.VTEX_ACCOUNT, process.env.VTEX_KEY, process.env.VTEX_TOKEN);
const axios = require('axios');

var vtex_utils = {

  //obtiene los detalles de una orden
	orderdetail: async (orderId) => {

		const response = await vtexSDK.oms.orders.getOrder(orderId)
	  .then((response) => {
	    return  response;
	  })
	  .catch((error) => {
			return error;
	  });

		return response;

	},

	starthandling: async function (order_Id){

		const response = await axios.post("https://"+process.env.VTEX_ACCOUNT+".vtexcommercestable.com.br/api/oms/pvt/orders/" + order_Id + "/start-handling",{},{
		  headers: {
		    'X-VTEX-API-AppKey': process.env.VTEX_KEY,
				'X-VTEX-API-AppToken': process.env.VTEX_TOKEN
		  }
		})
    .then(function (response) {
			let re_response = {
				status: response.status,
				data: response.data
			}
      return re_response;
    })
    .catch(function (error) {
			let res_error = {
				status: 500,
				message: "Error al cambiar el estado a starthandling."
			}
      return res_error;
    });

    return response;

	},

	changeOrderStatus: async function(json_invoiced){

		let json_invoiced_send = {
			type: "Output",
	    issuanceDate: json_invoiced.issuanceDate,
	    invoiceNumber: json_invoiced.SalesOrder,
	    invoiceValue: json_invoiced.invoiceValue
		}

		const response = await axios.post("https://"+process.env.VTEX_ACCOUNT+".vtexcommercestable.com.br/api/oms/pvt/orders/" +json_invoiced.OrderNumber+ "/invoice",
		json_invoiced_send,
		{
		  headers: {
		    'X-VTEX-API-AppKey': process.env.VTEX_KEY,
				'X-VTEX-API-AppToken': process.env.VTEX_TOKEN
		  }
		})
    .then(function (response) {
			let re_response = {
				status: response.status,
				data: response.data
			}
      return re_response;
    })
    .catch(function (error) {
			let res_error = {
				status: 500,
				message: "Error al cambiar el estado a Invoiced."
			}
      return res_error;
    });
    return response;
	},

};

module.exports = vtex_utils;
