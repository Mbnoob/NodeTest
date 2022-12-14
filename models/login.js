const myconnection = require("../config/db_config");

const login = () => {};

login.withLogin = (email, cb) => {
  myconnection.query(
    "SELECT * from students WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return cb(err);
      } else {
        return cb(results);
      }
    }
  );
};

module.exports = login;
