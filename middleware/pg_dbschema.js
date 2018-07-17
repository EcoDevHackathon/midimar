const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://jvnunenmsixtda:fd050031169d5d2adc01d0c0f191a73c8b67a7a9eafbeca96f6973a052e45fcb@ec2-50-19-232-205.compute-1.amazonaws.com:5432/d3o1u74nfnh9jm?ssl=true'

pg.connect(connectionString, (err, client, done) => {
  // Handle connection errors
  if (err) {
    console.log(err);
    // return res.status(500).json({success: false, data: err});
  }
  else {
    console.log('connection successfuly')
  }
});


