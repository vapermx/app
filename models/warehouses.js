'use strict'
var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var WarehousesSchema = Schema({
  city: {type: String, required: true},
  name: {type: String, required: true},
  gps_lat: {type: String, required: true},
  gps_log: {type: String, required: true},
  push_included_segments: {type: String, required: true},
  active: Boolean
});
WarehousesSchema.index({ city: 1, name: 1 },{ unique: true });

module.exports = mongoose.model('Warehouses',WarehousesSchema);
