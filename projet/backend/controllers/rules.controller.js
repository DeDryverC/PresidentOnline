const rules = require('../model/rules.model');
const mysql = require('../model/db');

module.exports = {
    getRules : (req, res) => {
        rules.getRules((err, data) =>{
            if(err) {
                res.status(500).send({
                    message: "Error retrieving rules",
                })
            }else{
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200);
                res.send(data);
            }
        });
    }
};