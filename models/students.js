const myconnection = require("../config/db_config");

const students = () => {};

students.findAll = (cb) => {
  myconnection.query("SELECT * FROM `students`", (err, results) => {
    if (err) {
      cb(null, err);
    } else {
      cb(results);
    }
  });
};

students.findbyId = (id, cb) => {
  myconnection.query(
    "SELECT * FROM `students` WHERE id = ?",
    [id],
    (err, results) => {
      if (!results[0]) {
        return cb({ message: "Can't Find User Data" });
      }
      if (err) {
        return cb(err);
      } else {
        return cb(results);
      }
    }
  );
};

students.createUsers = (data, cb) => {
  myconnection.query(
    "INSERT INTO `students`(`name`, `age`, `dob`, `gender`, `city`, `phone_no`,`email`, `registration_no`, `passwords`) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)",
    [
      data.name,
      data.age,
      data.dob,
      data.gender,
      data.city,
      data.phone_no,
      data.email,
      data.registration_no,
      data.passwords,
    ],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Posted Succesfully" });
      }
    }
  );
};

students.updateUsers = (data, id, cb) => {
  myconnection.query(
    "UPDATE `students` SET `name`=?,`age`=? ,`dob`=? ,`gender`=?,`city`=? ,`phone_no`=? , `email`=?, `registration_no`=?, `passwords`=?, `updated_at`=CURRENT_TIMESTAMP WHERE id =?",
    [
      data.name,
      data.age,
      data.dob,
      data.gender,
      data.city,
      data.phone_no,
      data.email,
      data.registration_no,
      data.passwords,
      id,
    ],
    (err, results) => {
      if (results.affectedRows == 0) {
        return cb({ message: "User Not Exist in Database" });
      }
      if (err) {
        return cb({ status: 404, err });
      } else {
        return cb({ status: 200, message: "Updated Succesfully" });
      }
    }
  );
};

students.deletebyID = (id, cb) => {
  myconnection.query(
    "DELETE FROM `students` WHERE id =?",
    [id],
    (err, results) => {
      if (err) {
        cb(null, { message: err.sqlMessage });
      } else {
        cb({ message: "Deleted Sucessfully" });
      }
    }
  );
};

module.exports = students;
