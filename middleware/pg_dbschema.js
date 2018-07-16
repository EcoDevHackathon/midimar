const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://idnjazepwgdgpr:58470ed7fed4dd500b4ed48d189f192f3d9ddddfacc9b450d39ac66b096507fb@ec2-54-83-33-213.compute-1.amazonaws.com:5432/deu5p5d7tuln86?ssl=true';


pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      console.log(err);
     // return res.status(500).json({success: false, data: err});
    }
    else{
      console.log('connection successfuly')
    }
    // SQL Query > Select Data
  //  const query = client.query('SELECT * FROM items ORDER BY id ASC;');
    // Stream results back one row at a time
   // query.on('row', (row) => {
  //    results.push(row);
 //   });
    // After all data is returned, close connection and return results
  //  query.on('end', () => {
  //    done();
      //return res.json(results);
    //});
  });




  Host = ec2-54-83-33-213.compute-1.amazonaws.com
  Database= deu5p5d7tuln86
  User=idnjazepwgdgpr
  Port=5432
  Password=58470ed7fed4dd500b4ed48d189f192f3d9ddddfacc9b450d39ac66b096507fb
  URI=postgres://idnjazepwgdgpr:58470ed7fed4dd500b4ed48d189f192f3d9ddddfacc9b450d39ac66b096507fb@ec2-54-83-33-213.compute-1.amazonaws.com:5432/deu5p5d7tuln86
  Heroku CLI
  heroku pg:psql postgresql-cubed-35855 --app midimar