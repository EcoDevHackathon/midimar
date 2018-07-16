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

exports.updateUserProfile = async function updateUserProfile(statusData, callback) {
    console.log("Getting userprofile update:");
    var user = new userModel();
    user.updateUserProfile(statusData, function(err, result) {
        console.log("User error:" + result);
        console.log("User update result:" + result);
        callback(err, result);
    });
}