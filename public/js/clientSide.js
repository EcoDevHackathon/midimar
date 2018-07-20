//clientSide 
var host = location.origin.replace(/^http/, 'ws');
var socket = io.connect(host)
var currentDate = new Date().toLocaleString();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var trackdate;
var index = 0;

$(document).ready(function() {
    $("#postAlert").click(function() {
        postAlert();
    });
});

//jqeury  function  to insert  to communicate to the form and back
function sendAlert() {
    var choiceDisaster = $('#choiceDisaster').find(":selected").text();
    var username = document.getElementById('username');
    var messageType = 'public';
    var data = {};

    data.content = pubmessage.value;
    data.author = localStorage.username;
    data.target = 'public';
    data.postedAt = currentDate;
    data.messageType = messageType;
    pubmessage.value = " ";
    $.post('/alert/', data, function(response) {}, 'JSON');
}
