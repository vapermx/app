'use strict'
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

var User = require('/home/vsmx/app/models/users');
var Sessions = require('/home/vsmx/app/models/sessions');
var OrdersModel = require('/home/vsmx/app/models/orders');

var controller = {

  registry: async function(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var users_model = new User();

    var params = req.body;

    users_model.phone = params.phone;
    users_model.name = params.name;
    users_model.mail = params.mail;
    users_model.birth = params.birth;

    //Obtenemos el salt
    let salt = await bcrypt.genSalt(10).then();
    let hash = await bcrypt.hash(params.password, salt).then();
    users_model.password = hash;

    //buscamos si hay algun telefono ya existente
    User.findOne({phone: users_model.phone, mail:users_model.mail}).exec((err, users) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!users){

        users_model.active = true;

        users_model.save((err, usersStored) => {

          if(err) return res.status(500).send({message: err});

          if(!usersStored) return res.status(404).send({message: 'No se a podido guardar.'});

          return res.status(200).send({message: 'Gracias por tu registro.'});
        });

      }else{

        return res.status(403).send({message: 'El usuario ya se encuentra registrado.'});

      }

    });

  },

  me: function(req, res){

    var userId = req.decoded.user_id;

    if(userId == null) return res.status(404).send({message: 'El id de usuario es obligatorio.'});

    User.findOne({_id: userId}, ['-token','-password']).exec((err, user) => {

        if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        return res.status(200).send(user);
    });

  },

  me_update: async function(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    var userId = req.decoded.user_id;
    var update = req.body;

    if(userId == null) return res.status(404).send({message: 'El id de usuario es obligatorio.'});

    if( req.body.phone != null && req.body.password != null){

      //Obtenemos el salt
      let salt = await bcrypt.genSalt(10).then();
      let hash = await bcrypt.hash(req.body.password, salt).then();

      update = {
        phone: req.body.phone,
        password: hash
      }

    }else if( req.body.phone != null ){

      update = {
        phone: req.body.phone
      }

    }else if( req.body.password != null ){

      //Obtenemos el salt
      let salt = await bcrypt.genSalt(10).then();
      let hash = await bcrypt.hash(req.body.password, salt).then();

      update = {
        password: hash
      }

    }else{

      return res.status(200).send({
        status: 200,
        message: 'Ningun dato enviado para actualizar.'
      });

    }


    User.findOneAndUpdate({_id: userId}, update, {new:true}, (err, userUpdate) => {
      if(err) return res.status(500).send({message: 'Error al actualizar.'});
      if(!userUpdate) return res.status(404).send({message: 'No existe el usuario.'});

      return res.status(200).send({
        phone: userUpdate.phone,
        name: userUpdate.name,
        mail: userUpdate.mail,
        status: userUpdate.status
      });
    });

  },

  delete: function(req, res){

    var userId = req.decoded.user_id;
    if(userId == null) return res.status(404).send({message: 'El id de usuario es obligatorio.'});

    User.findOneAndRemove({ _id: userId }, (err, projectRemoved) => {
      if(err) return res.status(500).send({message: 'Error al eliminar.'});
      if(!projectRemoved) return res.status(404).send({message: 'Los datos ingresados son incorrectos.'});

      Sessions.findOneAndRemove({ user_id: userId }, (err, projectRemoved) => {
        if(err) return res.status(500).send({message: 'Error al eliminar.'});
        if(!projectRemoved) return res.status(404).send({message: 'Los datos ingresados son incorrectos.'});

        return res.status(200).send({message: 'Usuario eliminado.'});
      });

    });

  },

  busy: function(req, res){

    var userId = req.decoded.user_id;
    if(userId == null) return res.status(404).send({message: 'El id de usuario es obligatorio.'});

    OrdersModel.findOne({'delivery.userId': userId, active: { $ne: 5 } }).exec((err, order) => {

      if(err) return res.status(500).send({message: 'Error al devolver los datos.'});

      if(!order){

        return res.status(200).send({
          status: 200,
          message: "El usuario esta disponible."
        });

      }

      return res.status(403).send({
        status: 403,
        message: 'El usuario ya se encuentra procesado una orden.',
        data: order
      });

    });

  }

};

module.exports = controller;
