/**
 * Author Jeannette Mukamana Bayi 2018 7/July/2018
 */

var schema = require('../middleware/pg_dbschema.js');

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
       
    }


    sendAlertByEmail(alert) {
        //send the alert by Email
    }

    sendAlertBySms(comment, receivers, alert, callback) {
        //send the alert by Sms
        const accountSid = 'AC518dd22f4ab34aff1b7a8eb966782a9e';
        const authToken = 'b171bcdea52d0240be052dadea301d55';
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: alert.toString() + 'wait',
                from: '(701) 401-5836',
                to: "+250785115074"
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


module.exports.getCoordinates = function getCoordinates(callback) {
    console.log("models .... coordinates")
    schema.getCoordinates(callback);
}



