
var CommunicationModel = require('../models/CommunicationModel.js');

//module.exports.registerCommunicationModel = async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
     var communication = new CommunicationModel(email, phone, communicationMode, disaster, level, place, language);
    console.log("logs in controllers!!!!!!!!!!!!!!!!");
    communication.registerCommunicationModel();
}

registerCommunicationModel('ja@gmail', '873', 'email', 'fire', 3, 'Butare', 'english');

