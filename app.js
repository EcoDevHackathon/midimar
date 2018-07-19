/*MIDIMAR CLIMATE HACKATHON*/
/*This the main engine of the esn project**/
/*created 7/18/2018 **/
/****happy coding guys **********/

/*
 Definition of required node modules/resources/variables
1.Express:
2.routes:
3.bodyparser:
4.Session:
5.session:
6.socket:
*/

var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes.js');
var session = require('express-session');
var server = require('http').createServer(app);


var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

var io = require('socket.io')(server);

app.use(session({
    cookieName: 'session',
    secret: 'fsegroup',
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

/*
Setting ejs as the base template
*/
app.set('view engine', 'ejs');

/*
  Setting the routes
*/
app.use('/', routes);

/*
Setting the static folder
*/

app.use(express.static('public'));


/*
Defining the server port and socket
*/
function start() {
    // routes.setup(app);
    app.use('/', routes);
    var port = process.env.PORT || 8000;
    server.listen(port, function () {
        console.log('Server listening at port %d', port);
    });

}
start()




