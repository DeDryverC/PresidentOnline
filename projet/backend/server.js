const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');

/*
// create a GET route
app.get('/test', (req, res) => {
  con.query('SELECT * FROM joueurs',function(err, result, fields) {
    if(err) throw err;
    res.send(result);
    
  })
});
*/

app.get("/", (req, res) => {
  res.json({message : "welcome to our api"})
});

const routes = require("./routes/user.route")(app);

// console.log that your server is up and running
app.listen(process.env.PORT || '5000', () => {
  console.log('the server is running on ${process.env.PORT || "5000"}');
});