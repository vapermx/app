'use strict'
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UsersSchema = Schema({
  user_id: {type: String, required: false, unique: true},
  jwt: String
});


module.exports = mongoose.model('Sessions',UsersSchema);
