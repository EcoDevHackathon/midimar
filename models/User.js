"use strict"
var _this = this;

var mongoSchemas = require("../middleware/schemas.js");
var RegExp = require("regex");
var Promise = require('es6-promise').Promise
var userSchema = mongoSchemas.User;
const DB_Controller = require('../controllers/DB_Controller.js');

class User {

    /*
           Class constructor: to initialize all user attribute for each crated on object

    */
    constructor(username, password, createdAt, lastLogin, lastStatusCode, accountStatus, approvalStatus, onlineStatus, socketId, eemail, eaddress, ephone, elatLoc, elongLoc, status, privilege) {


        this.username = username
        this.password = password
        this.createdAt = createdAt
        this.lastLogin = lastLogin
        this.lastStatusCode = lastStatusCode
        this.accountStatus = accountStatus
        this.approvalStatus = approvalStatus
        this.onlineStatus = onlineStatus
        this.socketId = socketId
        this.eemail = eemail
        this.eaddress = eaddress
        this.ephone = ephone
        this.elatLoc = elatLoc
        this.elongLoc = elongLoc
        this.status = status
        this.privilege = privilege

    }

    getLastStatusCode() {
        return this.lastStatusCode
    }

    setLastStatusCode(statusCode) {
        this.lastStatusCode = statusCode;
    }

    getUsername() {
        return this.username
    }

    setUsername(username) {
        return this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        return this.password = password;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    setCreatedAt(createdAt) {
        return this.createdAt = createdAt;
    }

    getLastLogin() {
        return this.lastLogin;
    }

    setLastLogin(lastLogin) {
        return this.lastLogin = lastLogin;
    }

    setEemail(eemail) {
        return this.eemail = eemail;
    }
    getEemail() {
        return this.eemail;
    }

    setEphone(ephone) {
        return this.ephone = ephone;
    }
    getEphone() {
        return this.ephone;
    }
    setEaddress(eaddress) {
        return this.eaddress = eaddress;
    }
    getEaddress() {
        return this.eaddress;
    }

    setElatLoc(elatLoc) {
        return this.elatLoc = elatLoc;
    }
    getElatLoc() {
        return this.elatLoc;
    }

    setElongLoc(elongLoc) {
        return this.elongLoc = elongLoc;
    }
    getElongLoc() {
        return this.elongLoc;
    }

    toString() {
        return `${this.username}, ${this.password}, ${this.createdAt}, ${this.lastLogin}, ${this.lastStatusCode}, ${this.accountStatus}, ${this.approvalStatus}`;
    }


    getUserList(callback) {
        DB_Controller.getUserList(function(err, result) {
            callback(err, result);
        });
    }

    isUserExists(theUsername, callback) {
        DB_Controller.isUserExists(theUsername, function(err, result) {
            callback(err, result);
        });
    }

    getUserSortedList(callback) {
        DB_Controller.getUserSortedList(function(err, docs) {
            callback(err, docs);
        });
    }

    userLogin(username, password, callback) {
        this.username = username;
        this.password = password;
        DB_Controller.userLogin(this, function(logs) {
            callback(logs);
        });
    }


    updateOnlineStatusForLogin(username, callback) {
        DB_Controller.updateOnlineStatusForLogin(username, function(err, numAffected) {
            callback(err, numAffected);

        });
    }

    updateUserDetails(userData, callback) {
        userSchema.update({ username: statuslog.username }, { $set: { eaddress: userData.address, eemail: userData.email, ephone: userData.phone, elatLoc: userData.latitude, elongLoc: userData.longitude } }, { new: true }, function(err, numAffected) {
            callback(err, numAffected);
        });
    }


    updateUserLocation(userData, callback) {
        userSchema.update({ username: statuslog.username }, { $set: { elatLoc: userData.latitude, elongLoc: userData.longitude } }, { new: true }, function(err, numAffected) {
            callback(err, numAffected);
        });
    }

    updateLastStatusCode(userId, code, callback) {
        DB_Controller.updateLastStatusCode(this, function(err, numAffected) {
            callback(err, numAffected);
        });
    }

    registerNewUser(callback) {
        DB_Controller.registerNewUser(this, function(err, result) { callback(err, result) });
    }


    verifyUserOnline(username, callback) {
        DB_Controller.verifyUserOnline(username, function(err, result) { callback(err, result); });
    }

    AssignUserSocketId(username, socketId, callback) {
        DB_Controller.AssignUserSocketId(username, socketId, function(err, numAffected) { callback(err, numAffected); });
    }


    updateOnlineStatusForLogout(username, callback) {
        DB_Controller.updateOnlineStatusForLogout(username, function(err, numAffected) {
            callback(err, numAffected);

        });
    }


    updateOnlineStatusForLogoutbySocketID(socketid, callback) {
        DB_Controller.updateOnlineStatusForLogoutbySocketID(socketid, function(err, numAffected) {

            callback(err, numAffected);
        });
    }

    /** Get the the socket ID given the user name
     *  @param {} user * 
     * @returns the socket Id 
     * * @return callback with socket ID 
     * @return callback with error in case something went wrong
     */
    getUserSocketId(callback) {
        DB_Controller.getUserSocketId(this, function(err, result) {
            callback(err, result);
        });
    }


    //===================coordinator:==================================================
    updateUserProfile(statuslog, callback) {
        var editdata = {}
        editdata.username = statuslog.username;
        editdata.editusername = statuslog.editusername;
        editdata.editpassword = statuslog.editpassword;
        editdata.editstatus = statuslog.editstatus;
        editdata.editprivilege = statuslog.editprivilege;

        userSchema.update({ username: editdata.username }, { $set: { username: editdata.editusername, status: editdata.editstatus, password: editdata.editpassword, privilege: editdata.editprivilege } }, { new: true }, function(err, numAffected) {
            if (err) {
                console.log("Err from db" + err);
                callback(err, numAffected);
            } else {
                console.log("Numb affected:" + numAffected.n);
                callback(err, numAffected.n);
            }

        });
    }
}

module.exports = User
module.exports.updateUserStatusCode = async function updateUserStatusCode(theUsername, theStatusCode) {
    return new Promise(function(resolve, reject) {
        userSchema.updateOne({ "username": theUsername }, { $set: { "lastStatusCode": theStatusCode } }).exec(function(err, numAffected) {
            if (err) reject(err)
            resolve(numAffected)
        });
    })
}

/** Getting users by criteria
 *  @param  * 
 * @returns 
 * * @return 
 * 
 */
module.exports.getUsersByCriteria = async function getUsersByCriteria(theKeywordType, theKeyword) {
    if (theKeywordType == 'username') {
        return new Promise(function(resolve, reject) {
            userSchema.find({ "username": { $regex: ".*" + theKeyword + ".*" } }).sort({ onlineStatus: -1, username: 1 }).exec(function(err, result) {
                resolve(result)
            })
        })

    } else if (theKeywordType == 'status') {
        return new Promise(function(resolve, reject) {
            userSchema.find({ "lastStatusCode": theKeyword }).sort({ onlineStatus: -1, username: 1 }).exec(function(err, result) {
                resolve(result)
            })
        })
    } else {

    }

}