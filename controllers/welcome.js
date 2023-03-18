'use strict'

var controller = {
  //Bienvenida
	welcome: function(req, res){
		return res.status(200).send({
			message: 'Servicios de la aplicación VpStudio V1.0.0'
		});
	}

};

module.exports = controller;
