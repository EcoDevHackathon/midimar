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

function loadCoordinates() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/alerts',
        success: function (response) {
            var resultsdiv = document.getElementById('alert_type');
            resultsdiv.innerHTML += ''+response.alert_type +'';
            var resultsdiv = document.getElementById('rainfall_amount');
            resultsdiv.innerHTML += ''+response.rainfall_amount +'';
            var resultsdiv = document.getElementById('rainfall_intensity');
            resultsdiv.innerHTML += ''+response.rainfall_intensity +'';
            var resultsdiv = document.getElementById('recorded_date');
            resultsdiv.innerHTML += ''+response.recorded_date +'';
            var resultsdiv = document.getElementById('expectated_startdate');
            resultsdiv.innerHTML += ''+response.excepected_startdate +'';
            var resultsdiv = document.getElementById('expectated_enddate');
            resultsdiv.innerHTML += ''+response.excepected_enddate +'';
            var resultsdiv = document.getElementById('description');
            resultsdiv.innerHTML += ''+response.description +'';
            var resultsdiv = document.getElementById('severity');
            resultsdiv.innerHTML += ''+response.severity+'';
            var resultsdiv = document.getElementById('sectors');
            resultsdiv.innerHTML += ''+response.sector+'';
            var resultsdiv = document.getElementById('longitude');
            resultsdiv.innerHTML += ''+response.longitude+'';
            var resultsdiv = document.getElementById('latitude');
            resultsdiv.innerHTML += ''+response.latitude+'';
            var resultsdiv = document.getElementById('district');
            resultsdiv.innerHTML += ''+response.district+'';
        }
    })
}

//loading  data using datablles
var arr = [];
function loadDisasterHistory() {
    var disasterData =[];
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
loadCoordinates()