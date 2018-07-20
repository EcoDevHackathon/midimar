
"use strict"
var rainfallalertModel = require('../models/rainfallalertModel.js');
var request = require('request');

module.exports.sendRainfallAlert  = async function sendRainfallAlert(alertType, startExpectedTime, endExpectedTime,  description, regions, alertSeverity,alertId, date, callback) {
    console.log("controller......");
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime,  description, regions, alertSeverity, alertId, date);
    rainfallAlert.registerRainfallAlert(callback);
}

//sendRainfallAlert('rodger@gmail.com', '873757575', 'email', 'fire', 3, 'Butare', 'english');


//send

//sesma
//map
//save
//


async function sendMessage(msg) {


}

