
'use strict';

var socket = require('socket.io');
var newSocket;
var emitData = {}



    /*
        Method to test socket id and allocated usernames
        Method:
        Purpose:
        Parameter:
        Return:
        */

class Socket {

    constructor(socket) {
        this.io = socket;

    }

    emitMessage(keyword, option, data) {
        newSocket = this.io;

        if (keyword == 'status') {
            emitData.username = data;
            emitData.status = option;
        }
        console.log("Emit event for " + keyword + " from:" + data);
        this.io.sockets.emit(keyword, emitData);
    }

    testingSocket(username) {
        newSocket = this.io;
        newSocket.on('connection', function (socket) {
            var username = socket.request._query['userId'];
            console.log("ewrwtrwtertwrConnecting new user with socket id" + socket.id);
            newSocket.sockets.sockets[username] = socket.id;
            var sock_id = newSocket.sockets.sockets['mike'];
            console.log("User id saved as socket variable:" + sock_id);
            newSocket = newSocket;

        });

    }

    /*The method expects a key word and data to be passed
     * the key word can be announcement and messages
     * @param and response
     *testing the socket emit
     */
    Broadcast(keyword, data) {
        this.io.sockets.emit(keyword, data)
    }

}


module.exports = Socket;