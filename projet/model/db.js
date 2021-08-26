const mysql = require("mysql");
const db = require("../config/db");

const pool = mysql.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
});

module.exports = pool;