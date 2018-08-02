/**
 * Author Jeannette Mukamana Bayi + Micheal Nayebare 2018 7/July/2018
 */

var schema = require('../middleware/pg_dbschema.js');
const nodemailer = require('nodemailer');
"use strict"
class rainfallAlertModel {
    constructor(alertType, startExpectedTime, endExpectedTime, description, alertSeverity, alertId, currentDate, rainfalAmount, rainfallIntensity, district, sector) {
        this.alertType = alertType;
        this.startExpectedTime = startExpectedTime;
        this.endExpectedTime = endExpectedTime;
        this.description = description;
        this.alertSeverity = alertSeverity;
        this.alertId = alertId;
        this.currentDate = currentDate;
        this.rainfalAmount = rainfalAmount;
        this.rainfallIntensity = rainfallIntensity;
        this.district = district;
        this.sector = sector;

    }

    getdistrict() {
        return this.district;
    }

    getsector() {
        return this.sector;
    }

    getrainfalAmount() {
        return this.rainfalAmount;
    }

    getrainfallIntensity() {
        return this.rainfallIntensity;
    }

    getalertType() {
        return this.alertType;
    }
    getstartExpectedTime() {
        return this.startExpectedTime;
    }
    getendExpectedTime() {
        return this.endExpectedTime;
    }

    getdescription() {
        return this.description;
    }

    getalertSeverity() {
        return this.alertSeverity;
    }


    getalertId() {
        return this.alertId;
    }

    getcurrentDate() {
        return this.currentDate;
    }
    toString() {
        return ` ${this.alertType}, ${this.startExpectedTime},${this.endExpectedTime}, ${this.description}, ${this.alertSeverity} ,${this.rainfalAmount}, ${this.rainfallIntensity}, ${this.district}, ${this.sector},`;
    }

    registerRainfallAlert(callback) {
        console.log("models......");

        //saving the alert
        console.log(this)
        schema.registerRainfallAlert(this, callback);

        //send the alert by Email
        //this.sendAlertByEmail(this)

        //send alre by sms
        // this.sendAlertBySms(this)
    }

    disseminate(comment, receivers, callback) {

        console.log("disseminating information......" + this);

        //loop and send individually

        this.sendAlertBySms(comment, receivers, this, callback)

        //tsend email
        this.sendAlertByEmail(this)

        //get receiver phone number from database

        // this.getReceiverPhoneNumber("jeannette") 

        this.sendAlertByEmail(comment, receivers, this, callback)

    }


    sendAlertByEmail(message) {
        //send the alert by Email
        console.log(this)
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'midimaralert@gmail.com',
                    pass: 'h0zg0Kkbupe$B3!B'
                },

            });
            let mailOptions = {
                from: 'MIDIMAR DISASTER ALERT <midimaralert@gmail.com>',
                to: 'jannekista3@gmail.com',
                subject: 'Midimar Disaster Alert',
                text: 'Heavy Rainfall shower',
                html: '<b>' + message + '</b>'
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });



    }

    //getting receiver's phone number
    getReceiverPhoneNumber(receivers) {
        console.log("searching for receiver's phone number")
        console.log(schema.getReceiverPhoneNumber(receivers));

    }

    sendAlertBySms(comment, receivers, alert, callback) {
        //send the alert by Sms

        console.log("receivers" + receivers);
        const accountSid = 'AC518dd22f4ab34aff1b7a8eb966782a9e';
        const authToken = 'b171bcdea52d0240be052dadea301d55';
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: alert.toString() + 'wait',
                from: '(701) 401-5836',
                to: receivers
            })
            .then(message => console.log(message.sid))
            .done();
        callback('null', "sent successfull")
    }

}
module.exports = rainfallAlertModel;
module.exports.getAlerts = function getAlerts(callback) {
    console.log("models .... alerts")
    schema.getAlerts(callback);
}
module.exports.getReport = function getReport(region, callback) {
    console.log("models get .......... reoprt")
    schema.getReport(region, callback);
}


module.exports.getCoordinates = function getCoordinates(callback) {
    console.log("models .... coordinates")
    schema.getCoordinates(callback);
}

//get population data
module.exports.getPopulation = function getPopulation(region,callback) {
    console.log("models .... population")
    schema.getPopulation(callback);
}

//get infrustructure data
module.exports.getInfrustructure = function getInfrustructure(callback) {
    console.log("models .... infrustructure")
    schema.getInfrustructure(callback);
}
