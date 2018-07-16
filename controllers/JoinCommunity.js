var _this = this;


/*
               
                *Authors
                1. Gilbert N. Adding Join Communty related logic/methods
                *Main Purpose:This file is to hold all use cases logic directly from the routes 
*/

/*
              Required files/libraries
              1. schemas.js:Containing collection/tables definition for for all use cases
              2. user.js:
              3. body-paser:
*/

var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });
var userModel = require("../models/User.js");
var statusCrumb = require("../models/StatusCrumb.js")
let date = require('node-datetime');
var session = require('express-session');
var moment = require('moment');
const dateformat = require("node.date-time");
const thisApp = require('../app.js');
const SocketController = require('../controllers/SocketController');
var theSocketController

exports.registerNewUser = async function registerNewUser(newUserDataSet, callback) {

    var timeStamp = moment().format();
    var newUser = new userModel(newUserDataSet.username, newUserDataSet.password, timeStamp, timeStamp, "OK", "ACTIVE", "NO", "Y", "", "", "", "", 0, 0, "Active", "Citizen");
    var datetime = new Date()
    crumbData = { username: newUserDataSet.username, statusCode: "OK", createdAt: datetime };
    newUser.registerNewUser(function(err, result) {
        if (err) {
            callback(err, result);
        } else {
            _this.addScrumb(crumbData, function(err, feedback) {});
            callback(err, result);
        }
    });
}

exports.getUserList = async function getUserList(callback) {
    var userObject = new userModel();
    userObject.getUserList(function(err, result) { callback(err, result); });
}

exports.getUserList = async function getUserList(callback) {
    var userObject = new userModel();
    userObject.getUserList(function(err, result) { callback(err, result); });
}

module.exports.isUserRegistered = async function isUserRegistered(userData, callback) {
    var user = new userModel();
    user.isUserExists(userData.username, function(err, result) { callback(err, result); });

}

exports.userLogin = async function userLogin(username, password, choice, callback) {
    var user = new userModel();
    user.userLogin(username, password, function(logs) {
        //console.log("userrrrrrrrrr:" + logs.status)

        if (logs.exist) {
            logs.exist = true;
            logs.username = username;
            logs.message = "The user exists";
            _this.updateOnlineStatusForLogin(username, function(err, numAffected) { callback(logs); });
        } else {
            if (choice == "confirm") {
                var user = {};
                user.username = username;
                user.password = password;
                _this.registerNewUser(user, function(err, result) {
                    if (err) {
                        logs.err = err;
                        logs.code = 401;
                        logs.message = "The User failed to be added";
                        callback(logs);
                    } else {
                        logs.created = true;
                        logs.code = 201;
                        logs.username = username;
                        logs.message = "The user created succesfully";
                        _this.updateOnlineStatusForLogin(username, function(err, numAffected) {
                            callback(logs);
                        });
                    }
                });
            } else {
                logs.cancel = true;
                logs.message = "The user cancelling the registration";
                callback(logs);
            }
        }
    });
}

exports.getUserSortedList = async function getUserSortedList(callback) {
    var user = new userModel();
    user.getUserSortedList(function(err, docs) { callback(err, docs); });
}

exports.updateOnlineStatusForLogin = async function updateOnlineStatusForLogin(username, callback) {
    var user = new userModel();
    user.updateOnlineStatusForLogin(username, function(err, numAffected) {
        if (err) {
            callback(err, numAffected);
        } else {
            var theSocketController = new SocketController(thisApp.socketio);
            theSocketController.Broadcast('login', username);
            callback(err, numAffected);
        }
    });
}

exports.verifyUserOnline = async function verifyUserOnline(username, callback) {
    var user = new userModel();
    user.verifyUserOnline(username, function(err, result) { callback(err, result); });
}

exports.updateLastStatusCode = async function updateLastStatusCode(user, callback) {
    var user = new userModel();
    user.updateLastStatusCode(user.username, user.lastStatusCode, function(err, result) { callback(err, result); });
}

exports.updateOnlineStatusForLogout = async function updateOnlineStatusForLogout(username, callback) {
    var user = new userModel();
    user.updateOnlineStatusForLogout(username, function(err, numbAffected) {
        if (err) {
            callback(err, numbAffected);
        } else {
            var theSocketController = new SocketController(thisApp.socketio);
            theSocketController.Broadcast('logout', username);
            callback(err, numbAffected);
        }
    });
}

exports.endSession = async function endSession(session) {
    session = session;
    session.destroy(function(err) {});
}


exports.addScrumb = async function addScrumb(scrumbData, callback) {
    var datetime = new Date();
    var statusCrumb1 = new statusCrumb(scrumbData.username, scrumbData.statusCode, datetime);
    statusCrumb1.save().then(function(feedback) {
        callback(false, feedback)
    }).catch(err => { callback(true, err) })
}