var mongoSchemas = require("../middleware/schemas.js");
var Promise = require('es6-promise').Promise
const dateformat = require("node.date-time");
var userSchema = mongoSchemas.User;
var messageSchema = mongoSchemas.Message;
var announcementSchema = mongoSchemas.Announcement;
var statusCrumbSchema = mongoSchemas.StatusCrumb;


module.exports.registerNewUser = async function regsterNewUser(user, callback) {
    var userModel = new userSchema(user);
    userModel.save(function(err, result) { callback(err, result);  });
}

module.exports.getUserList = async function getUserList(callback) {
    userSchema.model('User').find(function(err, result) {
        if (err) {  callback(err, result);
        } else { callback(err, result); }
    });
}

module.exports.isUserExists = async function isUserExists(theUsername, callback) {
    var userModel = new userSchema(theUsername);
    userModel.model('User').findOne(function(err, user) {callback(err, user); });
}

module.exports.userLogin = async function userLogin(logUser, callback) {
    var logResult = {};
    logResult.message = "";
    logResult.status = false;
    logResult.err = "";
    logResult.exist = false, logResult.code = -1, logResult.username = "", logResult.password = "";
    logResult.username = logUser.username;
    logResult.password = logUser.password;
    userSchema.findOne({ username: logUser.username }, function(err, user) {
        if (err) {
            logResult.status = false; logResult.message = "Error: checking username of the existing user";
            logResult.err = err;callback(logResult);
        } else {
            if (user) {
                logResult.exist = true;
                if (logUser.password == user.password) {
                    logResult.status = true; logResult.message = "the user credential match"; logResult.code = 200;   callback(logResult);
                } else {
                    logResult.status = false; logResult.message = "The username or passowrd does not match";
                    logResult.code = 400; callback(logResult);
                }
            } else {
                logResult.status = false;  logResult.message = "The user does not exist";
                callback(logResult);
            }
        }
    });
}

module.exports.getUserSortedList = async function getUserSortedList(callback) {
    userSchema.find({}).sort({ onlineStatus: -1, username: 1 }).exec(function(err, docs) {  callback(err, docs); });
}

module.exports.updateOnlineStatusForLogin = async function updateOnlineStatusForLogin(theUsername, callback) {
    var datetime = new Date();
    userSchema.update({ username: theUsername }, { $set: { onlineStatus: 'Y', lastLogin: datetime } }, { new: true }, function(err, numAffected) { callback(err);});
}

module.exports.verifyUserOnline = async function verifyUserOnline(theUsername, callback) {
    userSchema.findOne({ username: theUsername, onlineStatus: 'Y' }, function(err, data) { callback(err, data);});
}

module.exports.AssignUserSocketId = async function AssignUserSocketId(user, callback) {
    userSchema.update({ username: user.username }, { $set: { socketId: user.socketid } }, options, function(err, numAffected) {callback(err, numAffected);});
}

module.exports.updateOnlineStatusForLogout = async function updateOnlineStatusForLogout(theUsername, callback) {
    userSchema.update({ username: theUsername }, { $set: { onlineStatus: 'N' } }, { new: true }, function(err, numAffected) { callback(err, numAffected);});

}

module.exports.updateOnlineStatusForLogoutbySocketID = async function updateOnlineStatusForLogoutbySocketID(theSocketId, callback) {
    userSchema.update({ socketId: theSocketId }, { $set: { onlineStatus: 'N' } }, options, function(err, numAffected) { callback(err, numAffected); });
}
