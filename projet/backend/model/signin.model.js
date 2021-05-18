const mysql = require('../model/db');
const signin = function () {

} 

signin.createUser=(User, result) => {
    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(User.password, salt, function(err, hash) {
            var requete = "INSERT INTO joueurs(Pseudo, Name, Surname, Email, Birthdate, Password, GameCount) VALUES ? ";
            var values = [[User.pseudo, User.name, User.surname, User.email, User.birthdate, hash ,User.gameCount]];
            mysql.query(requete, [values],
                (err, res) => {
                    if (err) {
                        console.log("error : ", err);
                result(null, err);
                return;
                }
                console.log("Signed up");
                result(null, res);

          
                });
            });
        });
    };

signin.createGuest=(result) => {
    let randomName = "guest" + Math.random().toString(36).substring(7);
    let randomEmail = randomName + "@guestuser.com";
    let randomPassword = Math.random().toString(36).substring(7);
    let date = new Date();
    date = date.getDate() +"/"+ (date.getMonth()+1) +"/"+date.getFullYear();
    let guestUser = {pseudo : randomName, name : randomName, surname : randomName, email : randomEmail, birthdate : date, password : randomPassword, gameCount : 0};

    var requete = "INSERT INTO joueurs(Pseudo, Name, Surname, Email, Birthdate, Password, GameCount) VALUES ? ";
    var values = [[guestUser.pseudo, guestUser.name, guestUser.surname, guestUser.email, guestUser.birthdate, guestUser.password, guestUser.gameCount]];


    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(guestUser.password, salt, function(err, hash) {
            var requete = "INSERT INTO joueurs(Pseudo, Name, Surname, Email, Birthdate, Password, GameCount) VALUES ? ";
            var values = [[guestUser.pseudo, guestUser.name, guestUser.surname, guestUser.email, guestUser.birthdate, hash, guestUser.gameCount]];
            mysql.query(requete, [values],
                (err, res) => {
                    if (err) {
                        console.log("error : ", err);
                        result(null, err);
                        return;
                    }
                    
                    res.message = guestUser.pseudo;
                    console.log(res.message);
                    result(null, res.message);

          
                });
            });
        });
}

module.exports = signin;
