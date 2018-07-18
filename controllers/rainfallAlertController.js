
"use strict"
var rainfallAlertControllerModel = require('../models/rainfallalertModel.js');
var request = require('request');

async function registerRainfallAlert(email, phone, communicationMode, disaster, level, place, language, callback) {
    var rainfallAlertController = new rainfallAlertControllerModel(email, phone, communicationMode, disaster, level, place, language);
    rainfallAlertController.registerRainfallAlert();
}

registerRianfallAlert('rodger@gmail.com', '873757575', 'email', 'fire', 3, 'Butare', 'english');


