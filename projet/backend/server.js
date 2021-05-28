const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const bcrypt = require('bcrypt');



app.get("/", (req, res) => {
  res.json({message : "welcome to our api"})
});

app.use(cors());
app.use(require("body-parser").json())
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const routes = require("./routes/user.route")(app);

// console.log that your server is up and running
app.listen(process.env.PORT || '5000', () => {
  console.log('the server is running on ${process.env.PORT || "5000"}');
});