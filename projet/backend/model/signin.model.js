/*
const signin = function () {

}

signin.sign=(User, result) => {
    var requete = "INSERT INTO joueurs(Pseudo, Name, Surname, Email, Birthdate, Password) VALUES ? ";
    var values = [[User.pseudo, User.name, User.email, User.birthDate, User.password]];
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
};

module.exports = signin;
*/