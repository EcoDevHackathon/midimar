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
const rainfallAlertController = require('./controllers/rainfallAlertController.js');
const DisastersController = require('./controllers/DisastersController.js');

//route for registering commmunication
router.get('/registerCommunication', function (req, res) { res.render('pages/map'); });


//route for sending meteo alert
router.get('/map', function (req, res) { res.render('pages/map'); });


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
router.get('/visualisation', function (req, res) { });

//route for sending meteo alert
router.get('/RainfallAlert', function (req, res) {

    res.render('pages/RainfallAlert');
});

//route for sending meteo alert
router.get('/warning', function (req, res) {

    res.render('pages/warning');
});


//warning to be disseminated

//route for sending meteo alert
router.post('/RainfallAlert', function (req, res) {
    //
    res.render('pages/RainfallAlert');
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


router.post('/alerts/', jsonParser, function (req, res) {
    console.log("routes req.body req.body");
    console.log("routes req.body", req.body);
    rainfallAlertController.sendRainfallAlert(req.body.alertType, new Date(), new Date(), req.body.description, req.body.alertSeverity, req.body.alertId, new Date(), req.body.rainfalAmount, req.body.rainfallIntensity, req.body.district, req.body.sector, (result, err) => {
        if (err) {
            res.status(400).json(err)

        } else {
            console.log(result);
            res.status(200).json(result);
        }
    });
});

//disseminating alert
router.post('/alerts/disseminate', jsonParser, function (req, res) {
    console.log("routes...... disseminate");
    rainfallAlertController.disseminate(req.body.alertType, req.body.startDate, req.body.endDate, null, req.body.alertSeverity, null, new Date(), null, null, req.body.district, req.body.sector, req.body.comment, "+250785115074" , (result, err) => {  
   if (err) {
            res.status(400).json(err)

        } else {
            res.status(200).json(result);
        }
    });
});

//get route for disasters
router.get('/disasters/', jsonParser, function (req, res) {
    console.log("routes.. disasters....");
    DisastersController.getDisasters((err, results) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results.rows);
        }
    });
});

//get route for alerts
router.get('/alerts/', jsonParser, function (req, res) {
    console.log("routes..from uri alerts....");
    rainfallAlertController.getAlerts((err, results) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results.rows);
        }
    });
});

//use route for coordinates
router.get('/coordinates/', jsonParser, function (req, res) {
    console.log("routes.. coordinates....");
    rainfallAlertController.getCoordinates((err, results) => {
        if (err) {
            res.status(400).json(err)
        } else {
            res.status(200).json(results.rows);
        }
    });
});

//route for full report
router.get('/fullreport', function (req, res) { res.render('pages/fullreport'); });

//default  home route 
router.get('/', function (req, res) { res.render('pages/home'); });

module.exports = router