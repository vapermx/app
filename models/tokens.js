'use strict'
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var TokensSchema = Schema({
  email: {type: String, required: true, unique: true},
  api_key: String,
  api_token: String,
  host: String,
  create: Object
});

module.exports = mongoose.model('app_keys',TokensSchema);
