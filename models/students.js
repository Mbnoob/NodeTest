const myconnection = require("../config/db_config");

const students = (students) => {
  this.name = students.name;
  this.age = students.age;
  this.dob = students.dob;
  this.gender = students.gender;
  this.city = students.city;
  this.phone_no = students.phone_no;
  this.registration_no = students.registration_no;
};

students.findAll = (cb) => {
  myconnection.query("SELECT * FROM `students`", (err, results) => {
    if (err) {
      cb(null, err);
    } else {
      cb(results);
    }
  });
};

students.findbyId = (id,c) => {
  myconnection.query(
    "SELECT * FROM `students` WHERE id = ?",[id],
    (err, results) => {
      if (err) {
        c(null, err);
      } else {
        c(results);
      }
    }
  );
};

module.exports = students;
