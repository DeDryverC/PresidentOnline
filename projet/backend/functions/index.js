const functions = require("firebase-functions");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const app = express();
//  const bodyParser = require("body-parser");
const cors = require("cors");
//  const bcrypt = require('bcrypt');

app.get("/", (req, res) => {
  res.json({message: "welcome to our api"});
});

app.use(cors());
app.use(require("body-parser").json());

//  const routes = require("./routes/user.route")(app);

// console.log that your server is up and running
app.listen(process.env.PORT || "5000", () => {
  console.log("the server is running on ${process.env.PORT }");
});

exports.api = functions.https.onRequest(app);
