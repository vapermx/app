'use strict'
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var OrdersSchema = Schema({
  orderid: {type: String, required: true, unique: true},
  name: String,
  phone: String,
  address: Object,
  distancia: Number,
  price: Number,
  items: Object,
  creationDate: Date,
  items_pickup: Object,
  active: Number,
  user_cancel: Boolean,
  delivery: Object
});

module.exports = mongoose.model('processed_orders',OrdersSchema);
