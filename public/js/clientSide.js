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
            disasterData.push(response); 
        }

    });
}

//function to load disasters

function loadDisasters(){
var disasterData = [];

$.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/disasters',
    success: function (response) {
        disasterData.push(response);
      
        var rows = "";
        $.each(response, function () {
            rows += "<tr><td>" + this.disaster_type + "</td><td>" + this.sector + "</td><td>" + this.recorded_date + "</td><td>" + this.deaths + "</td><td>" + this.injured + "</td><td>" + this.missing + "</td><td>" + this.houses_destroyed + "</td><td>" + this.houses_damaged + "</td></tr>";
        })
        $(rows).appendTo("#itemList tbody");
    }
});
}

//function load data given sector
function loadFullreport()
{
    hrefurl = $(location).attr("href");
    last_part = hrefurl.substr(hrefurl.lastIndexOf('/') + 1)
    urlString =  last_part
    $.ajax({
        url: '/report/'+urlString,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
  
            var resultsdiv = document.getElementById('alert_type');
            resultsdiv.innerHTML += '' + response[0].alert_type + '';
            var resultsdiv = document.getElementById('rainfall_amount');
            resultsdiv.innerHTML += '' + response[0].rainfall_amount + '';
            var resultsdiv = document.getElementById('rainfall_intensity');
            resultsdiv.innerHTML += '' + response[0].rainfall_intensity + '';
            var resultsdiv = document.getElementById('recorded_date');
            resultsdiv.innerHTML += '' + response[0].recorded_date + '';
            var resultsdiv = document.getElementById('expectated_startdate');
            resultsdiv.innerHTML += '' + response[0].excepected_startdate + '';
            var resultsdiv = document.getElementById('expectated_enddate');
            resultsdiv.innerHTML += '' + response[0].excepected_enddate + '';
            var resultsdiv = document.getElementById('description');
            resultsdiv.innerHTML += '' + response[0].description + '';
            var resultsdiv = document.getElementById('severity');
            resultsdiv.innerHTML += '' + response[0].severity + '';
            var resultsdiv = document.getElementById('sectors');
            resultsdiv.innerHTML += '' + response[0].sector + '';
            var resultsdiv = document.getElementById('longitude');
            resultsdiv.innerHTML += '' + response[0].longitude + '';
            var resultsdiv = document.getElementById('latitude');
            resultsdiv.innerHTML += '' + response[0].latitude + '';
            var resultsdiv = document.getElementById('district');
            resultsdiv.innerHTML += '' + response.district + '';    
            //severity detail 
            var resultsdiv = document.getElementById('severity_detail');
            resultsdiv.innerHTML += '' + response[0].severity + '';   

            var resultsdiv = document.getElementById('event_type');
            resultsdiv.innerHTML += '' + response[0].alert_type + ''; 
        }
    });

}

loadFullreport()

//loadDisasters()
//loadDisasterHistory()

