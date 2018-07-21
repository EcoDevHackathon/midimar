
"use strict"
var rainfallalertModel = require('../models/rainfallalertModel.js');
var request = require('request');

module.exports.sendRainfallAlert  = async function sendRainfallAlert(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity,alertId, date,rainfalAmount, rainfallIntensity,district, sector, callback) {
    console.log("controller......");
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector);
    rainfallAlert.registerRainfallAlert(callback);


}


module.exports.getAlerts = function getAlerts(callback) {
    console.log("controllers .... alerts") 
    rainfallalertModel.getAlerts(callback);
}

module.exports.getCoordinates = function getCoordinates(callback) {
    console.log("controllers .... coordinates") 
    rainfallalertModel.getCoordinates(callback);
}

//sendRainfallAlert('rodger@gmail.com', '873757575', 'email', 'fire', 3, 'Butare', 'english');


//send

//sesma
//map
//save
//


async function sendMessage(msg) {


}

