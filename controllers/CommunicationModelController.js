
"use strict"
var CommunicationModel = require('../models/CommunicationModel.js');

async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
    var communication = new CommunicationModel(email, phone, communicationMode, disaster, level, place, language);
    //console.log("logs in controllers!!!!!!!!!!!!!!!!");
    communication.registerCommunicationModel();
}

registerCommunicationModel('rodger@gmail.com', '873757575', 'email', 'fire', 3, 'Butare', 'english');

//write function to send email according to the selected query


