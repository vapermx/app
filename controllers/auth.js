'use strict'
require('dotenv').config();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

var User = require('/home/vsmx/app/models/users.js');
var Sessions = require('/home/vsmx/app/models/sessions.js');

var controller = {

  login_users: async function(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({mail: req.body.mail}).exec(async (err, users) => {

      if(err) return res.status(500).send({status: 500, message: 'Error al realizar el proceso.'});
      if(!users) return res.status(403).send({status: 403, message: 'Los datos ingresados no son correctos.'});

      let compare_pass = await bcrypt.compare(req.body.password, users.password).then();

      if( !compare_pass ){
        return res.status(403).send({status: 403, message: 'Los datos ingresados no son correctos.'});
      }else{
        const payload = {
         user_id: users.id
        };
        const access_token = jwt.sign(payload, process.env.KEY, {
         expiresIn: '365d'
        });

        var update = {
          user_id : users.id,
          jwt : access_token
        };
        
        Sessions.findOneAndUpdate({user_id: users.id}, update, {upsert: true, new:true}, (err, sessionUpdate) => {
          if(err) return res.status(500).send({message: err});

          if(!sessionUpdate) return res.status(404).send({message: 'Datos erroneos.'});

          return res.status(200).send({
              message: 'Autenticación correcta',
              access_token: access_token
            });
        });
      }

    });

  },

  logout_users: function(req, res){

    Sessions.findOneAndRemove({ user_id: req.decoded.user_id }, (err, projectRemoved) => {
      if(err) return res.status(500).send({message: 'Error al realizar el proceso.'});
      if(!projectRemoved) return res.status(404).send({message: 'Los datos de autenticacion no son validos.'});

      return res.status(200).send({message: 'Usuario salio.'});
    });

  }

};

module.exports = controller;

//process.env.KEY
