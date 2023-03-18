'use strict'
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UsersSchema = Schema({
  mail: {type: String, required: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  active: Boolean
});
UsersSchema.index({ mail: 1, password: 1 },{ unique: true });

module.exports = mongoose.model('User',UsersSchema);
