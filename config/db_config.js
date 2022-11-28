const mysql = require("mysql");

const myconnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    DB_PORT : process.env.DB_PORT
  });

  myconnection.connect((err) => {
    if (!err) {
      console.log("Connected Succesfully On Port");
    } else {
      console.log(err);
    }
  });

  module.exports = myconnection;