const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');


app.get("/", (req, res) => {
  res.json({message : "welcome to our api"})
});

app.use(cors());

const routes = require("./routes/user.route")(app);

// console.log that your server is up and running
app.listen(process.env.PORT || '5000', () => {
  console.log('the server is running on ${process.env.PORT || "5000"}');
});