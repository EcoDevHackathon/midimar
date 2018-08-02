const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://jvnunenmsixtda:fd050031169d5d2adc01d0c0f191a73c8b67a7a9eafbeca96f6973a052e45fcb@ec2-50-19-232-205.compute-1.amazonaws.com:5432/d3o1u74nfnh9jm?ssl=true';
const client = new pg.Client(connectionString);
client.connect()
const results = [];

//function to enter communication data into the database
module.exports.registerCommunication = async function (communicationMode, callback) {
  //  console.log(communicationMode.getEmail())
  var email = communicationMode.getEmail();
  var phonenumber = communicationMode.getPhone();
  var communicationchoice = communicationMode.getCommunicationMode();
  var disastertype = communicationMode.getDisaster();
  var disasterlevel = communicationMode.getLevel();
  var username = "roger";
  var place = communicationMode.getPlace();
  var roles = "admin";
  var language = communicationMode.getLanguage();

  client.query('INSERT INTO public.communication(email,phonenumber,communicationchoice,disastertype,disasterlevel,username,place,roles,languages)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [email, phonenumber, communicationchoice, disastertype, disasterlevel, username, place, roles, language], (err, res) => {

      if (err) {
        console.log(err.stack)
      } else {
        console.log('data saved successfully');
      }
    })
}

//function to select results done but needs polishing up and the right queries applied.
function selectAdministratorEmail() {
  const query = client.query('SELECT * FROM communication ORDER BY id ASC');
  query.on('row', (row) => {
    results.push(row);
  });
  // After all data is returned, close connection and return results
  query.on('end', () => {
    console.log(results);
  });
}

//register rainfall Alert Model into the database
module.exports.registerRainfallAlert = async function (rainfallAlertModel, callback) {
  var alertType = rainfallAlertModel.getalertType();
  var startExpectedTime = rainfallAlertModel.getstartExpectedTime();
  var endExpectedTime = rainfallAlertModel.getendExpectedTime();
  var description = rainfallAlertModel.getdescription();
  var alertSeverity = rainfallAlertModel.getalertSeverity();
  var currentDate = rainfallAlertModel.getcurrentDate();
  var alertId = rainfallAlertModel.getalertId();
  var rainfalAmount = rainfallAlertModel.getrainfalAmount();
  var rainfallIntensity = rainfallAlertModel.getrainfallIntensity();
  var district = rainfallAlertModel.getdistrict();
  var sector = rainfallAlertModel.getsector();
  client.query('INSERT INTO public.rainfall_alert(alert_type, rainfall_amount, rainfall_intensity,excepected_startdate,excepected_enddate,recorded_date,description,severity,alert_id, district,sector,color )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
    [alertType, rainfalAmount, rainfallIntensity, startExpectedTime, endExpectedTime, currentDate, description, alertSeverity, alertId, district, sector, 'Red'], (err, res) => {

      if (err) {
        console.log(err)
        callback(err);
      } else {
        callback('data saved successfully');
      }
    })
}

//getting all disasters
module.exports.getDisasters = async function getDisasters(callback) {
  const query = client.query('SELECT disaster_type,sector,recorded_date,deaths,injured,missing,houses_destroyed,houses_damaged,relocated FROM public.disaster_history', (err, result) => {
  if (err) {
      callback(err)
    } else {
      query.on('row', (row) => {
        results.push(jsonArray);
      });

      query.on('end', () => {
      // var jsonArrayd = JSON.parse(result);
        console.log("disasters????", results);
        callback(err, result)
      });

    }

  });
}

//getting alerts coordinat
module.exports.getCoordinates = async function getCoordinates(callback) {

  const query = client.query('SELECT * FROM public.regions', (err, result) => {
    if (err) {
      callback(err, results)
    } else {
      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        console.log("coordinates????", result);
        callback(err, result)
      });

    }

  });
}

//getting all alerts
module.exports.getAlerts = async function getAlerts(callback) {
  const query = client.query('SELECT * FROM public.rainfall_alert, public.regions where public.rainfall_alert.sector = public.regions.name', (err, result) => {
    if (err) {
      callback(err, results)
    } else {
      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        console.log("disasters????", results);
        callback(err, result)
      });

    }

  });
}


//getting report for a given region
module.exports.getReport = async function getReport(region , callback) {

  const query = client.query("SELECT * FROM public.rainfall_alert where public.rainfall_alert.sector = '"+region+"'", (err, result) => {
    if (err) {
      callback(err, results)
    } else {
      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        console.log("get report", results);
        callback(err, result)
      });

    }

  });
}

//get population data
module.exports.getPopulation = async function getPopulation(callback) {
  const query = client.query('SELECT * FROM public.population', (err, result) => {
    if (err) {
      callback(err,results)
    } else {
      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        console.log("population", results);
        callback(err, result)
      });

    }

  });
}

//get infrustructures
module.exports.getInfrustructure = async function getInfrustructure(callback) {
  const query = client.query('SELECT * FROM public.infrustructure', (err, result) => {
    if (err) {
      callback(err, results)
    } else {
      query.on('row', (row) => {
        results.push(row);
      });

      query.on('end', () => {
        console.log("infrustructure", results);
        callback(err, result)
      });

    }

  });
}
