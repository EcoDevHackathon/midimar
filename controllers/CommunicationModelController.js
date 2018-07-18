
"use strict"
var CommunicationModel = require('../models/CommunicationModel.js');
var Message = require('../models/Message.js');

async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
    console.log("registering communication mode");
    var communication = new CommunicationModel(email, phone, communicationMode, disaster, level, place, language);
    communication.registerCommunicationModel();
}
//registerCommunicationModel('rodger@gmail.com', '873757575', 'email', 'fire now', 3, 'Butare', 'english');


//send email function
function sendTechnicalEmail(mailOptions) {
    // Generate test SMTP service account from gmail
    Message.sendTechnicalEmail(mailOptions)
}

/*
let mailOptions =[{
    from: 'MIDIMAR DISASTER ALERT <midimaralert@gmail.com>',
    to: 'jannekista@gmail.com',
    subject: 'Midimar Disaster Alert',
    text: 'Heavy Rainfall shower',
    html: '<b>Heavy Raain Expected on such a day</b>'
}, {
    from: 'MIDIMAR DISASTER ALERT <midimaralert@gmail.com>',
    to: 'jannekista3@gmail.com',
    subject: 'Midimar Disaster Alert',
    text: 'Heavy Rainfall shower',
    html: '<b>Heavy Raain Expected on such a day</b>'
}] ;
//call the function
sendTechnicalEmail(mailOptions);
*/