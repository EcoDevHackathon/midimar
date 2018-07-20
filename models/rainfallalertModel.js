/**
 * Author Jeannette Mukamana Bayi 2018 7/July/2018
 */

var schema = require('../middleware/pg_dbschema.js');

"use strict"
class rainfallAlertModel {
    constructor( alertType, startExpectedTime, endExpectedTime,  description, regions, alertSeverity, alertId, currentDate) {
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

    registerRainfallAlert (){
        console.log("models......");
        schema.registerRainfallAlert(this);
    }
}

module.exports = rainfallAlertModel;




