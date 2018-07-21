//clientSide 
var currentDate = new Date().toLocaleString();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var trackdate;
var index = 0;

$(document).ready(function () {
    $("#postAlert").click(function () {
        postAlert();
    });
});


//get the alerts data

function loadAlerts() {
    $data = 'micheal';
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/alerts/',
        success: function (response) {

            if (response == "404") {
                alert("unable to retrieve data for alerts:" + response);
            } else {
                var results = document.getElementById("alert");
                for (var g = 0; g < 12; g++) {
                    $("#alerts").append("<tr><td>" + data + "</td></tr>");
                 console.log('tets')
                }
            }
        }
    });
}

loadAlerts()