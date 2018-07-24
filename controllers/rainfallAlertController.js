
"use strict"
var rainfallalertModel = require('../models/rainfallalertModel.js');
var request = require('request');

module.exports.sendRainfallAlert = async function sendRainfallAlert(alertType, startExpectedTime, endExpectedTime, description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector, callback) {
    console.log("controller......");
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime, description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector);    rainfallAlert.registerRainfallAlert(callback);


}

//disseminating information
module.exports.disseminate = async function disseminate(alertType, startExpectedTime, endExpectedTime, description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector, comment, receivers, callback) {
    console.log("controller......");
    // var rainfallAlert = new rainfallalertModel(
    var rainfallAlert = new rainfallalertModel(alertType, startExpectedTime, endExpectedTime, description, alertSeverity, alertId, date, rainfalAmount, rainfallIntensity, district, sector);
    rainfallAlert.disseminate(comment, receivers, callback);
}
//alerts model
module.exports.getAlerts = function getAlerts(callback) {
    console.log("controllers .... alerts")
    rainfallalertModel.getAlerts(callback);
}
//get full report  model
module.exports.getReport = function getReport(region, callback) {
    console.log("controllers .... report")
    rainfallalertModel.getReport(region, callback);
}

//get coordinates data
module.exports.getCoordinates = function getCoordinates(callback) {
    console.log("controllers .... coordinates")
    rainfallalertModel.getCoordinates(callback);
}

//get population
module.exports.getPopulation= function getPopulation(region,callback) {
    console.log("controllers .... coordinates")
    rainfallalertModel.getPopulation(callback);
}

//get infrutructure
module.exports.getInfrustructure= function getInfrustructure(callback) {
    console.log("controllers")
    rainfallalertModel.getInfrustructure(callback);
}


//writting a sync functions for sending messages
async function sendMessage(msg) {


}

