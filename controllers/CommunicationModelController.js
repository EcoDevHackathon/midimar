
"use strict"
var CommunicationModel = require('../models/CommunicationModel.js');
const nodemailer = require('nodemailer');
var request = require('request');

async function registerCommunicationModel(email, phone, communicationMode, disaster, level, place, language, callback) {
    var communication = new CommunicationModel(email, phone, communicationMode, disaster, level, place, language);
    communication.registerCommunicationModel();
}
//registerCommunicationModel('rodger@gmail.com', '873757575', 'email', 'fire', 3, 'Butare', 'english');


//send email function
function sendEmailTechnician() {
    // Generate test SMTP service account from gmail
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'midimaralert@gmail.com',
                pass: 'h0zg0Kkbupe$B3!B'
            }
        });
        let mailOptions = {
            from: 'MIDIMAR DISASTER ALERT <midimaralert@gmail.com>',
            to: 'micheal.nayebare@gmail.com',
            subject: 'Midimar Disaster Alert',
            text: 'Heavy Rainfall shower',
            html: '<b>Heavy Raain Expected on such a day</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
}

//call the function
//sendEmailTechnician();

//sms function to send sms using textbelt..
//for improvement please check https://textbelt.com/
//function to be asynchronous and  send message from query generated from model

function sendSmsTechnician() {
    request.post('https://textbelt.com/text', {
        form: {
            phone: '+250782330752',
            message: 'MIDIMAR Disaster Alert',
            key: 'textbelt',
        },
    }, function (err, httpResponse, body) {
        if (err) {
            console.error('Error:', err);
            return;
        }
        console.log(JSON.parse(body));
    })
}

sendSms()