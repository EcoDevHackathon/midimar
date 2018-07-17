/**
 * Author D.Bernard
 */

"use strict"
class CommunicationModel {
    constructor(email, phone, communicationMode, disaster, level, place, languguage) {
        this.email = email;
        this.communicationMode = communicationMode;
        this.disaster = disaster;
        this.level = level;
        this.place = place;
        this.languguage = languguage
    }

    getEmail() {
        return this.email;
    }

    getCommunicationMode() {
        return this.communicationMode;
    }

    getDisaster() {
        return this.disaster;
    }

    getLevel() {
        return this.level;
    }

    getPlace() {
        return this.place;
    }

    getLanguguage() {
        return this.languguage;
    }

    toString() {
        return `${this.email}, ${this.communicationMode}, ${this.disaster}, ${this.level}, ${this.languguage}}`;
    }

    registerCommunicationModel() {
        var message = this
    }
}

module.exports = CommunicationModel



