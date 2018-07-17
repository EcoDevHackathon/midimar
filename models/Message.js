/**
 * Author D.Bernard
 */

"use strict"
class Sms {
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

    registerCommunicationModel() {

        var message = this


    }

    sendPublicEmail(receiverEmailAddress, alert) {

      


    }

    sendPubliSms(receiverPhoneNumber, alert) {

       


    }

    sendTechnicalEmail(receiverEmailAddress, alert) {

        


    }

    sendTechnicalSms(receiverPhoneNumber, alert) {



    }



}

module.exports = CommunicationModel




