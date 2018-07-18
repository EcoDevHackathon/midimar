const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://jvnunenmsixtda:fd050031169d5d2adc01d0c0f191a73c8b67a7a9eafbeca96f6973a052e45fcb@ec2-50-19-232-205.compute-1.amazonaws.com:5432/d3o1u74nfnh9jm?ssl=true';
const client = new pg.Client(connectionString);
//client.connect()

/* Test query
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', () => { client.end(); });
*/

//

module.exports.registerCommunication = async function(communicationMode,callback){
  client.connect()
  console.log("communicationMode"+communicationMode);
  const query = client.query(
  'INSERT INTO public."communication1" (id, phonenumber, communicationchoice, disastertype, disasterlevel, username, place, roles, languages ) VALUES(1,'+communicationMode.getPhone()+', '+communicationMode.getCommunicationMode()+', '+communicationMode.getDisaster()+','+communicationMode.getLevel()+', '+"Micheal"+','+communicationMode.getPlace()+', '+"admin"+', '+communicationMode.getLanguage()+')'
)
   query.on('end', () => { client.end(); });}