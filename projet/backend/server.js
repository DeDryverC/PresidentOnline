const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

//connection to db
const con = mysql.createConnection({
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11403727',
  password: 'RXWf4ahVtG',
  database: 'sql11403727',
})

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to db');
})

// create a GET route
app.get('/test', (req, res) => {
  con.query('SELECT * FROM joueurs',function(err, result, fields) {
    if(err) throw err;
    res.send(result);
    
  })
});

app.get('/rules', (req, res) => {
  con.query('SELECT * FROM regles',function(err, result, fields) {
    if(err) throw err;
    res.send(result);
  })
});

