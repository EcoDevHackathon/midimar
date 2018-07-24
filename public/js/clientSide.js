//clientSide 
var currentDate = new Date().toLocaleString();
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var trackdate;
var index = 0;

$(document).ready(function () {
    $("#sendAlert").click(function () {
        sendAlert();
    });

    $("#disseminate").click(function () {
        disseminateWarning();
    });

    $(".fullreport").click(function () {
        window.location = "http://localhost/fullreport/";
        alert('hey')
    });

});


//get the alerts data
function loadAlerts() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/alerts',
        success: function (response) {

            if (response == "404") {
                alert("unable to retrieve data for alerts:" + response);
            } else {
                console.log(response.rows)
                for (var g = 0; g < response.rows.length; g++) {
                    //$("#alerts").append("<tr><td>" + data + "</td></tr>");
                    console.log(reponse.rows[g])
                }
            }
        }
    });
}

function sendAlert() {
    // alert("hereee");
    var alerts = {}

    var alertType = document.getElementById('alertType');
    var startDate = document.getElementById('expectedStartingTime');
    var endDate = document.getElementById('expectedEndTime');
    var description = document.getElementById('description');
    var alertSeverity = document.getElementById('alertySeverity');
    //should  be auto generated
    //alerts.alertId = 3
    var currentDate = document.getElementById('expectedStartingTime');
    var rainfalAmount = document.getElementById('rainfallAmount');
    var rainfallIntensity = document.getElementById('rainfallIntensity')
    var district = document.getElementById('district');
    var sector = document.getElementById('sector');

    alerts.alertType = alertType.value;
    alerts.startDate = startDate.value;
    alerts.endDate = endDate.value;
    alerts.description = description.value;
    alerts.alertSeverity = alertSeverity.value;
    //should  be auto generated
    alerts.alertId = 3
    alerts.currentDate = currentDate.value;
    alerts.rainfalAmount = rainfalAmount.value;
    alerts.rainfallIntensity = rainfallIntensity.value
    alerts.district = district.value;
    alerts.sector = sector.value;
    alert(alerts.alertType);


    $.post('/alerts', alerts, function (response) {
        console.log(response);
    }, 'JSON');
}

function disseminateWarning() {
    var warning = {}

    var alertType = document.getElementById('alertType');
    var startDate = document.getElementById('expectedStartingTime');
    var endDate = document.getElementById('expectedEndTime');
    var comment = document.getElementById('comment');
    var alertSeverity = document.getElementById('alertySeverity');
    var receiver = document.getElementById('receiver');
    var currentDate = document.getElementById('expectedStartingTime');
    var district = document.getElementById('district');
    var sector = document.getElementById('sector');

    warning.alertType = alertType.value;
    warning.startDate = startDate.value;
    warning.endDate = endDate.value;
    warning.comment = comment.value;
    warning.alertSeverity = alertSeverity.value;
    //should  be auto generated
    warning.alertId = 3
    warning.currentDate = currentDate.value;
    warning.district = district.value;
    warning.sector = sector.value;
    $.post('/alerts/disseminate', warning, function (response) {
        console.log(response);
    }, 'JSON');
    // alert('miracles')

}


//loadCoordinates()

//loading  data using datablles
var arr = [];
function loadDisasterHistory() {
    var disasterData = [];
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/disasters',
        success: function (response) {

            //for(var y in response){
            //console.log(response.rows[y].disaster_type)
            disasterData.push(response);
        }

    });
}


loadDisasterHistory()

