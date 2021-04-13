const history = require('../model/history.model');
const mysql = require('../model/db');

module.exports = {
    getHistory : (req, res) => {
        history.getHistory((err, data) =>{
            if(err) {
                res.status(500).send({
                    message: "Error retrieving history",
                })
            }else{
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200);
                res.send(data);
            }
        });
    }
};