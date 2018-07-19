/**
 * Author D.Bernard
 */

"use strict"
const nodemailer = require('nodemailer');
class Message {
    constructor(message, receipient, date) {
        this.message = message;
        this.receipient = receipient;
        this.date = date;
    }

    getMessage() {
        return this.message;
    }

    getReceipient() {
        return this.receipient;
    }

    getDate() {
        return this.date;
    }

    toString() {
        return `${this.message}, ${this.receipient}, ${this.date}}`;
    }


    sendPublicEmail(receiverEmailAddress, alert) {




    }

    sendPublicSms(receiverPhoneNumber, alert) {




    }


    sendTechnicalSms(receiverPhoneNumber, alert) {



    }



}

module.exports = Message

module.exports.sendTechnicalEmail = function sendTechnicalEmail(mailOptions) {
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
        for(var i=0; i<mailOptions.length;i++){
        transporter.sendMail(mailOptions[i], (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }
        //
    });


}






