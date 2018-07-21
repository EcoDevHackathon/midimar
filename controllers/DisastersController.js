"use strict"
var Disaster = require('../models/Disaster.js');

module.exports.getDisasters = function getDisasters(callback) {
    console.log("controllers .... disasters") 
    Disaster.getDisasters(callback);
}
