const sql = require('../model/db');
const signin = function () {

}

signin.createUser=(User, result) => {
    let bcrypt = require('bcryptjs');
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(User.password, salt, function(err, hash) {
            var requete = "INSERT INTO joueurs(Pseudo, Name, Surname, Email, Birthdate, Password, GameCount) VALUES ? ";
            var values = [[User.pseudo, User.name, User.surname, User.email, User.birthdate, hash ,User.gameCount]];
            sql.query(requete, [values],
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
    

module.exports = signin;
