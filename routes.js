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
router.get('/registerCommunication', function(req, res) {
 
        res.render('pages/registerCommunication');
    });

    //route for sending meteo alert
router.get('/alert', function(req, res) {
 
    res.render('pages/alert');
});

//route for sending meteo alert
router.get('/map', function(req, res) {
 
    res.render('pages/map');
});
router.get('/', function(req, res) {
    user = req.session;
    user.username;
    user.password;
    if (!user.username) {
        res.render('pages/home');
    }
});

router.post('/registerCommunication/', jsonParser, function(req, res) {
    const request={name:req.body.username, email: req.body.email, phone:req.body.phone, com:req.body.choiceCom,
         disaster:req.body.choiceDisaster, level:req.body.choiceLevel,  place:req.body.place, language:req.body.language} 
       // if (err) {
           // res.status(400)

       // } else {
           // res.status(200).json(res);
       // }
   console.log(request);
});

router.get('/search/announcements', function(req, res) {
    InforSearchingController.getSearchesInAnnouncements(req.query, function(err, result) {
        if (err) {
            res.status(404)
        } else {
            res.status(200).json(result)

        }
    })
})


router.get('/search/citizens', function(req, res) {
    InforSearchingController.getUsersByCriteria(req.query, function(err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)
        }
    })
});

router.get('/search/publicMessages', function(req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPublicMessages(req.query, function(err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)

        }
    })
});

router.get('/search/privateMessages', function(req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPrivateMessages(req.query, function(err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)
        }
    })

    res.render('pages/registerCommunication');
});
//route for visualisation
router.get('/visualisation', function (req, res) {});

    //route for sending meteo alert
    router.get('/RainfallAlert', function (req, res) {

        res.render('pages/RainfallAlert');
    });

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


    router.post('/alerts/', jsonParser, function(req, res) {
        console.log("routes......");
        console.log(new Date (req.body.startExpectedTime).getTime());

        //rainfallAlertController.sendRainfallAlert(req.body.alertType,new Date (req.body.startExpectedTime).getTime() ,  new Date (req.body.endExpectedTime).getTime(), req.body.description, req.body.regions, req.body.alertSeverity,req.body.alertId, new Date(req.body.date).getTime(), (err, result) => {
            
            rainfallAlertController.sendRainfallAlert(req.body.alertType,new Date(),  new Date(), req.body.description, req.body.alertSeverity,req.body.alertId, new Date(),  req.body.rainfalAmount,  req.body.rainfallIntensity, req.body.district,  req.body.sector, ( result, err) => {
                if (err) {
                res.status(400).json(err)
    
            } else {
                res.status(200).json(result);
            }
        });
    });

    router.get('/disasters/', jsonParser, function(req, res) {
        console.log("routes.. disasters....");     
            DisastersController.getDisasters(( err, results ) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.get('/alerts/', jsonParser, function(req, res) {
        console.log("routes.. alerts....");     
        rainfallAlertController.getAlerts(( err, results ) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(results);
            }
        });
    });
 
    //
    router.get('/coordinates/', jsonParser, function(req, res) {
        console.log("routes.. coordinates....");     
        rainfallAlertController.getCoordinates(( err, results ) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(200).json(results);
            }
        });
    });
//default  home route 
router.get('/', function (req, res) { res.render('pages/home'); });
module.exports = router