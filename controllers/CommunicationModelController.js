
var CommunicationModel = require('../models/CommunicationModel.js');

module.exports.registerCommunicationModel = async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
    var communication = new CommunicationModel(email, phone, communicationMode, disaster, level, place, language);
    CommunicationModel.registerCommunicationModel();

}