/**
 * Author Jeannette Mukamana Bayi
 */

var schema = require('../middleware/pg_dbschema.js');

"use strict"
class CommunicationModel {
    constructor(email, phone, communicationMode, disaster, level, place, language) {
        this.email = email;
        this.phone = phone;
        this.communicationMode = communicationMode;
        this.disaster = disaster;
        this.level = level;
        this.place = place;
        this.language = language;
    }

    getEmail() {
        return this.email;
    }
    getPhone() {
        return this.phone;
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

    getLanguage() {
        return this.language;
    }

    toString() {
        return `${this.email}, ${this.phone},${this.communicationMode}, ${this.disaster}, ${this.level}, ${this.language}`;
    }

    registerCommunicationModel() {
        schema.registerCommunication(this);
    }
}

module.exports = CommunicationModel




