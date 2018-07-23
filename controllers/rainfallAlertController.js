
"use strict"
var rainfallalertModel = require('../models/rainfallalertModel.js');
var request = require('request');

module.exports.sendRainfallAlert  = async function sendRainfallAlert(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity,alertId, date,rainfalAmount, rainfallIntensity,district, sector, callback) {
    console.log("controller......");
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector);
    rainfallAlert.registerRainfallAlert(callback);


}

//disseminating information
module.exports.disseminate  = async function disseminate(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity,alertId, date,rainfalAmount, rainfallIntensity,district, sector, comment, receivers, callback) {
    console.log("controller......");
   // var rainfallAlert = new rainfallalertModel(
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime,  description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector);
    rainfallAlert.disseminate(comment, receivers, callback);
}

module.exports.getAlerts = function getAlerts(callback) {
    console.log("controllers .... alerts") 
    rainfallalertModel.getAlerts(callback);
}

module.exports.getReport = function getReport(region, callback) {
    console.log("controllers .... report") 
    rainfallalertModel.getReport(region, callback);
}

module.exports.getCoordinates = function getCoordinates(callback) {
    console.log("controllers .... coordinates") 
    rainfallalertModel.getCoordinates(callback);
}


async function sendMessage(msg) {


}

