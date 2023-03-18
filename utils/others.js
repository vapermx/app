'use strict'
require('dotenv').config();
const clientSMS = require('twilio')(process.env.accountSid, process.env.authToken);
//const clientSMS = require('twilio')("AC60be1ba708d541f0bf320936e272c40d", "f8c300b98de5b349c035d8b566844376");
var moment = require('moment-timezone');
const {phone} = require('phone');

var others_utils = {

  //obtiene los detalles de una orden
	getKilometros: (lat1,lon1,lat2,lon2) => {

    let rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3); //Retorna tres decimales

	},

	get_Date: () =>{

		let date = new Date(Date.now());
		var date_m = moment(date);
		return date_m.tz('America/Mexico_city').format();

	},

	send_sms: (message, number) => {

		let phone_date = phone(number);
		let real_phone;

		if(phone_date.isValid == true){
			real_phone = phone_date.phoneNumber.replace(phone_date.countryCode,"");
		}else{
			real_phone = number;
		}

		clientSMS.messages
      .create({
         body: message,
         from: process.env.number_from,
				 to: real_phone
			 })
      .then(
        message => console.log(message.sid)
      );
	},

	send_whatsapp: (message, number) => {
		clientSMS.messages
      .create({
         from: 'whatsapp:'+process.env.number_fro,
         body: 'Probando el mensaje de whatsapp',
         to: 'whatsapp:+5527281888'
       })
      .then(message => console.log(message.sid));
	},

	get_token: () => {

    var codigo_sms = Math.floor(Math.random()*90000) + 10000;
    return codigo_sms;

  }

};

module.exports = others_utils;
