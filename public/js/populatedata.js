var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var d;

$('#alert').hide()

/*populate historical_disaster data */
function populateHistoricalData(historicalData) {
    localStorage.setItem("emergencyMessages", JSON.stringify(historicalData))
}


