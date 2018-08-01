var schema = require('../middleware/pg_dbschema.js');

"use strict"
class Disaster {
    constructor( event, province, district,  sector, date, location, deaths, injured, missing, houses_destroyed, houses_damaged, directly_affected, indirectly_affected, 
        relocated, evacuated,losses_usd, losses_local, damages_crops_hectares, lost_cattle, damages_roads_meters, comments) {
        this.event = event;
        this.province = province;
        this.district = district;
        this.sector = sector;
        this.date = date;
        this.location = location;
        this.deaths = deaths;
        this.injured = injured;
        this.missing = missing;
        this.houses_destroyed = houses_destroyed;
        this.houses_damaged = houses_damaged;
        this.directly_affected = directly_affected;
        this.indirectly_affected = indirectly_affected;
        this.relocated = relocated;
        this.evacuated = evacuated;
        this.losses_usd = losses_usd;
        this.losses_local = losses_local;
        this.damages_crops_hectares = damages_crops_hectares;
        this.lost_cattle = lost_cattle;
        this.damages_roads_meters = damages_roads_meters;
        this.indirectly_affected = indirectly_affected;
        this.comments = comments;
        
    }

    geteventevent() {
        return this.event;
    }
    getprovince() {
        return this.province;
    }
    getdistrict() {
        return this.district;
    }

    getsector() {
        return this.sector;
    }

    getdate() {
        return this.date;
    }

    getlocation() {
        return this.location;
    }
    getdeaths() {
        return this.deaths;
    }

    getinjured() {
        return this.injured;
    }

    getmissing() {
        return this.missing;
    }

    gethouses_destroyed() {
        return this.houses_destroyed;
    }
    gethouses_damaged() {
        return this.houses_damaged;
    }
    getdirectly_affected() {
        return this.directly_affected;
    }
    getindirectly_affected() {
        return this.indirectly_affected;
    }
    getrelocated() {
        return this.relocated;
    }

    getevacuated() {
        return this.evacuated;
    }  
    getlosses_usd() {
        return this.losses_usd;
    }  
    getlosses_local() {
        return this.losses_local;
    }  
    getdamages_crops_hectares() {
        return this.damages_crops_hectares;
    }  
    getlost_cattle() {
        return this.lost_cattle;
    }  
    getlosses_usd() {
        return this.losses_usd;
    }  
    getlosses_local() {
        return this.losses_local;
    }  
    getdamages_crops_hectares() {
        return this.damages_crops_hectares;
    }
    getlost_cattle() {
        return this.lost_cattle;
    }
    getdamages_roads_meters() {
        return this.damages_roads_meters;
    }

    getindirectly_affected() {
        return this.indirectly_affected;
    }
    getcomments() {
        return this.comments;
    }
    toString() {
        return `${this.event}, ${this.province},${this.district}, ${this.sector}, ${this.date}, ${this.location},
        ${this.deaths},${this.injured},${this.missing},${this.houses_destroyed},${this.houses_damaged},${this.directly_affected},${this.indirectly_affected},
        ${this.relocated},${this.evacuated},${this.losses_usd},${this.losses_local},${this.damages_crops_hectares},${this.lost_cattle},${this.damages_roads_meters},${this.comments}, `;
    }
}

module.exports = Disaster;
module.exports.getDisasters = function getDisasters(callback) {
  console.log("models .... disasters")  
    schema.getDisasters(callback);
}




