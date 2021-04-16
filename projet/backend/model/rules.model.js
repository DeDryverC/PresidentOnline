const mysql = require('./db');

module.exports = {
    getRules : (result) => {
        mysql.query("select * from regles", (err, res) => {
            if (err) {
                console.log("error : ", err);
                result(null, err);
                return;
            }
            console.log(res);
            result(null,res);
        });
    }
};