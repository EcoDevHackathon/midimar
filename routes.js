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


var ERController
var ERModel

var user;

//route for registering commmunication
router.get('/registerCommunication', function (req, res) {

    res.render('pages/registerCommunication');
});
//route for visualisation
router.get('/visualisation', function (req, res) {

    res.render('pages/visualisation');
});

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

router.get('/search/announcements', function (req, res) {
    InforSearchingController.getSearchesInAnnouncements(req.query, function (err, result) {
        if (err) {
            res.status(404)
        } else {
            res.status(200).json(result)

        }
    })
})


router.get('/search/citizens', function (req, res) {
    InforSearchingController.getUsersByCriteria(req.query, function (err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)
        }
    })
});

router.get('/search/publicMessages', function (req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPublicMessages(req.query, function (err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)

        }
    })
});

router.get('/search/privateMessages', function (req, res) {
    user = req.session;
    InforSearchingController.getSearchesInPrivateMessages(req.query, function (err, result) {
        if (err) {
            res.status(404);
        } else {
            res.status(200).json(result)
        }
    })

});


router.get('/users', function (req, res) {
    JoinCommunityController.getUserSortedList(function (err, docs) {
        if (err) {
            res.status(404);
        } else {
            res.json(docs);
        }
    });
});

router.post('/users', jsonParser, function (req, res) {
    user = req.session;
    if (req.body.choice == "join") {
        user.username = req.body.username;
        user.password = req.body.password;
        console.log("Username:" + user.username + "  password:" + user.password);
    } else {


    }

    if (req.body.choice == "join" || req.body.choice == "cancel" || req.body.choice == "confirm") {
        JoinCommunityController.userLogin(user.username, user.password, req.body.choice, function (logs) {
            user.username = req.body.username;
            user.password = req.body.password;
            console.log("Log in user:" + user.username);
            res.json(logs);
        });
    }


    if (req.body.choice == "editusername" || req.body.choice == "editpassword" || req.body.choice == "editprivilege" || req.body.choice == "editstatus") {

        adminController.updateUserProfile(req.body, function (err, result) {
            if (err) {
                console.log("Error updatinguser profile:" + err);
                res.json(result);
            } else {
                console.log("User updated successfully:" + result);
                res.json(result);
            }
        });

    }

});
router.post('/users/username/statuscode', jsonParser, function (req, res) {
    user = req.session;
    ShareStatus.updateUserStatusCode(req.body.username, req.body.status, req.body.reason, function (err, feedback) {
        if (err) {
            res.status(400);
        } else {
            res.status(200);
        }
    });

});

router.get('/users/username/logout', jsonParser, function (req, res) {
    user = req.session;
    JoinCommunityController.updateOnlineStatusForLogout(user.username, function (err, numAffected) {
        if (err) {
            res.json(numAffected.ok);
        } else {
            req.session.destroy(function (err) { });
            res.json(data);
        }
    });

});

router.post('/emergencies/', jsonParser, function (req, res) {
    DonationController.saveEmergency(req.body.title, req.body.name, req.body.quantity, req.body.description, (err, result) => {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(result);
        }
    });
});

router.get('/emergencies/', jsonParser, function (req, res) {
    DonationController.getEmergencies((err, result) => {
        if (err) {
            res.status(400)
        } else {
            thisApp.socketio.emit()
            res.status(200).json(result);
        }
    });
});

router.get('/emergencyDetails/', function (req, res) {
    DonationController.getEmergencyById(req.query.id, (err, result) => {
        if (err) {
            res.status(400).json(2);
        } else {
            res.status(200).json(result);
        }
    });
});

router.post('/Donation', jsonParser, function (req, res) {
    DonationController.donateToEmergency(req.body.id, req.body.money, function (err, feedback) {
        if (err) {
            res.status(400);
        } else {
            res.status(200).json(feedback);
        }
    });

});

router.get('/messages', function (req, res, err) {
    ChatController.getLatestMessagesAndStatusCode(req.query.author, req.query.target, function (err, messages) {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(messages)
        }
    });
});

router.post('/announcements', jsonParser, function (req, res) {
    ChatController.postAnnouncement(req.body.author, req.body.title, req.body.content, function (err, annoucementJSON) {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json('OK');
        }
    })
    var data = JSON.stringify(req.body);
});

router.get('/announcements', function (req, res) {
    ChatController.getLatestAnnouncements(function (err, announcementsJSON) {
        if (err) {
            res.status(404)
        } else {
            announcementsJSON['announcementData'].forEach(element => { });
            res.json(announcementsJSON)
        }
    })
});

router.get('/friends', function (req, res) {
    user = req.session;
    EmergencyGroup.GetFriendReport(req.query.username, function (err, result) {
        if (err) {
            res.json(404)
        } else {
            res.json(result)
        }
    });

});

router.get('/statuscrumb', function (req, res) {
    user = req.session;
    EmergencyGroup.getListAllStatuscrumb(function (err, result) {
        if (err) {
            res.json(404)
        } else {
            res.json(result)
        }
    });

});

router.post('/friends', jsonParser, function (req, res) {
    user = req.session;
    if (req.body.status == "pending friend") {
        EmergencyGroup.addNewGroupFriend(req.body, function (err, result) {
            if (error) { res.status(404) } else { res.json(200) }
        });

    } else {
        EmergencyGroup.updateFriendGroupStatus(req.body, function (err, numAffected) {
            if (err) {
                res.json(404);
            } else {
                if (numAffected == 1) {
                    res.json(200);
                } else {
                    res.json(201);
                }
            }
        });
    }
});

router.post('/groups', jsonParser, function (req, res) {
    user = req.session;
    EmergencyGroup.createNewGroup(req.body.username, function (err, result) {
        if (err) { res.status(404) } else { res.json(200) }
    });
});

router.get('/emergencyRooms/', jsonParser, async function (req, res) {
    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')
    ERController.getERMetadata(ERModel, function (error, result) {
        if (error) { res.status(404) } else { res.json(200) }
    })
})


router.post('/emergencyRooms/', jsonParser, function (req, res) {
    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')
    if (req.body) {
        ERController.saveER(ERModel, req.body, function (error, result) {
            if (error) { res.status(404) } else { res.json(200) }
        })
    }

})

router.delete('/emergencyRooms/:id', function (req, res) {
    ERController = req.app.get('EmergencyRoomController')
    ERModel = req.app.get('EmergencyRoomModel')
    if (req.params.id) {
        var id = JSON.parse(req.params.id);
        ERController.removeER(ERModel, id, function (error, result) {
            if (error) { res.status(404) } else { res.json(200) }
        })
    }
})

router.get('/hitwordmessages/', jsonParser, function (req, res) {
    emergencyController.getLatestHitMessages(function (err, messages) {
        if (err) {
            res.status(400)
        } else {
            res.status(200).json(messages)
        }
    });
});

router.get('/usereditprofileList', function (req, res) { res.render('pages/editProfileList'); });
router.get('/edituserprofile', function (req, res) { res.render('pages/editprofile'); });
router.get('/announcementspage', function (req, res) { res.render('pages/announcements'); });
router.get('/join', function (req, res) { res.render('pages/join'); });
router.get('/confirmation', function (req, res) { res.render('pages/confirmation'); });
router.get('/home', function (req, res) { res.render('pages/home'); });
router.get('/thanks', function (req, res) { res.render('pages/ThankDonanors'); });
router.get('/success', function (req, res) { res.render('pages/ThankRegistors'); });
router.get('/sharestatus', function (req, res) { res.render('pages/sharestatus'); });
router.get('/statistics', function (req, res) { res.render('pages/statistics'); });
router.get('/coordinations', function (req, res) { res.render('pages/emergency'); });
router.get('/Donations', function (req, res) { res.render('pages/donation'); });
router.get('/userdirectory', function (req, res) { res.render('pages/users'); });
router.get('/searchinfopage', function (req, res) { res.render('pages/searchinfo'); });
router.get('/chatprivately', function (req, res) { res.render('pages/chatprivately'); });
router.get('/chatpublicly/', function (req, res) { res.render('pages/chatpublicly'); });
router.post('/users/status/statuscode', function (req, res) {
    var data = JSON.stringify(req.body);
    res.json(req.body);
});
router.get('/friendspage', function (req, res) { res.render('pages/friends'); });
router.get('/grouppage', function (req, res) { res.render('pages/groups'); });
router.get('/groupfriendemergencymessagepage', function (req, res) { res.render('pages/groupemergencymessage'); });
router.get('/groupnotificationspage', function (req, res) { res.render('pages/groupnotifications'); });
router.get('/invitingfriendpage', function (req, res) { res.render('pages/userlist'); });
router.get('/emergencygroupterms', function (req, res) { res.render('pages/setupgroup'); });
router.get('/groupmessagepage', function (req, res) { res.render('pages/groupmessages'); });
router.get('/userlocationpage', function (req, res) { res.render('pages/map'); });
router.get('/groupchatpage', function (req, res) { res.render('pages/groupchat'); });
router.get('/groups', jsonParser, function (req, res) {
    user = req.session;
    res.json(req.body);
});
router.get('/shower', function (req, res) { res.render('pages/shower'); });


module.exports = router