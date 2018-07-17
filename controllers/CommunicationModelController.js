
"use strict"
var CommunicationModel = require('../models/CommunicationModel.js');

//module.exports.registerCommunicationModel = async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
    function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
          CommunicationModel.registerCommunicationModel();
}

registerCommunicationModel('email','873','email','fire',3,'Butare','english');

