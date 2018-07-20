/**
 * Author Jeannette Mukamana Bayi 2018 7/July/2018
 */

var schema = require('../middleware/pg_dbschema.js');

"use strict"
class rainfallAlertModel {
    constructor(alertType, startExpectedTime, endExpectedTime, description, regions, alertSeverity, alertId, currentDate) {
        this.alertType = alertType;
        this.startExpectedTime = startExpectedTime;
        this.endExpectedTime = endExpectedTime;
        this.description = description;
        this.regions = regions;
        this.alertSeverity = alertSeverity;
        this.alertId = alertId;
        this.currentDate = currentDate;

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

    getregions() {
        return this.regions;
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
        return `${this.alertType}, ${this.startExpectedTime},${this.endExpectedTime}, ${this.description}, ${this.regions}, ${this.alertSeverity}`;
    }

    registerRainfallAlert(callback) {
        console.log("models......");

        //saving the alert
        schema.registerRainfallAlert(this, callback);

        //send the alert by Email
        this.sendAlertByEmail(this)

        //send alre by sms
        this.sendAlertBySms(this)
    }


    sendAlertByEmail(alert) {
        //send the alert by Email
    }

    sendAlertBySms(alert) {
        //send the alert by Sms
        const accountSid = 'AC518dd22f4ab34aff1b7a8eb966782a9e';
        const authToken = 'b171bcdea52d0240be052dadea301d55';
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: alert.toString()+'wait',
                from: '(701) 401-5836',
                to: '+250785115074'
            })
            .then(message => console.log(message.sid))
            .done();
    }
}

module.exports = rainfallAlertModel;




