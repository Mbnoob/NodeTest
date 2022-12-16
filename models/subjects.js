const myconnection = require("../config/db_config");

const subjects = () => {};

subjects.Findall = (cb) => {
  myconnection.query("SELECT * FROM `subjects`", (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(results);
    }
  });
};

subjects.FindbyId = (id, cb) => {
  myconnection.query(
    "SELECT * FROM `subjects` WHERE id =?",
    [id],
    (err, results) => {
      if (err) {
        cb(err);
      } else {
        cb(results);
      }
    }
  );
};

subjects.insertSubject = (data, cb) => {
  myconnection.query(
    "INSERT INTO `subjects`(`sub_name`, `sub_code`, `start_time`, `end_time`, `room_no`)VALUES (?, ?, ?, ?, ?)",
    [
      data.sub_name,
      data.sub_code,
      data.start_time,
      data.end_time,
      data.room_no,
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

subjects.updatedata = (data, id, cb) => {
  myconnection.query(
    "UPDATE `subjects` SET `sub_name`=?, `sub_code`=?,`start_time`=?,`end_time`=?,`room_no`=?, `updated_at`= CURRENT_TIMESTAMP WHERE id= ?",
    [
      data.sub_name,
      data.sub_code,
      data.start_time,
      data.end_time,
      data.room_no,
      id,
    ],
    (err, results) => {
      if (err) {
        cb({ status: 404, message: err.sqlMessage });
      } else {
        cb({ status: 200, message: "Updated Succesfully" });
      }
    }
  );
};

subjects.deletedata = (id,cb)=>{
  myconnection.query(
          "DELETE FROM `subjects` WHERE id = ?",
          [id],
          (err, results) => {
            if (err) {
              cb({ message: err.sqlMessage });
            } else {
              cb({ message: "Deleted Sucessfully" });
            }
          }
        );
}
module.exports = subjects;