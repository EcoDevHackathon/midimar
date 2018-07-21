const thisApp = require('./app.js');
var express = require('express');
var app = express();
app.use(express.json());
app.set('view engine', 'ejs');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
var router = express.Router();
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
const urlencoded = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
var data = {};

var user;

//route for registering commmunication
router.get('/registerCommunication', function (req, res) { res.render('pages/registerCommunication'); });
//route for sending meteo alert
router.get('/alert', function (req, res) { res.render('pages/alert'); });
//route for full report'
router.get('/fullreport', function (req, res) { res.render('pages/fullreport'); });
//route for getting the alerts
var customer = {};


router.get('/alerts', function (req, res) {  res.send(data); });

//route for sending meteo alert
router.get('/map', function (req, res) { res.render('pages/map'); });
router.get('/', function (req, res) {
    user = req.session;
    user.username;
    user.password;
    if (!user.username) {
        res.render('pages/home');
    }
});

router.post('/registerCommunication/', jsonParser, function (req, res) {
    const request = {
        name: req.body.username, email: req.body.email, phone: req.body.phone, com: req.body.choiceCom,
        disaster: req.body.choiceDisaster, level: req.body.choiceLevel, place: req.body.place, language: req.body.language
    }
    // if (err) {
    // res.status(400)

    // } else {
    // res.status(200).json(res);
    // }
    console.log(request);
});

//route for visualisation
router.get('/visualisation', function (req, res) { res.render('pages/registerCommunication') });
//route for sending meteo alert
router.get('/alert', function (req, res) { res.render('pages/alert'); });
//default  home route 
router.get('/', function (req, res) { res.render('pages/home'); });
module.exports = router