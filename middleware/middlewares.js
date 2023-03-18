var jwt = require('jsonwebtoken');
require('dotenv').config();

var Sessions = require('/home/vsmx/app/models/sessions.js');

const middlewares = {

    userprotectUrl : function (req, res, next) {

      const token = req.headers['access-token'];

      if (token) {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
          if (err) {
            return res.status(403).json({ mensaje: 'Token inválida' });
          } else {

            req.decoded = decoded;

            Sessions.findOne({user_id: req.decoded.user_id, jwt: token}).exec((err, users) => {

              if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
              if(!users) return res.status(404).send({message: 'Los datos de autenticación no son validos.'});

              next();
            });

          }
        });
      } else {
        res.status(403).send({
            mensaje: 'Token no enviada.'
        });
      }

    }

};
module.exports = middlewares;
//process.env.KEY