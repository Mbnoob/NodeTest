const myconnection = require("../config/db_config");

const student_subjects = () => {};

student_subjects.addForigenkeys = (data, cb) => {
  myconnection.query(
    "INSERT INTO `student_subjects`(`students_id`, `subject_id`) VALUES (?, ?)",
    [data.students_id, data.subject_id],
    (err, results) => {
      if (err) {
        cb({ status: 406, message: err.sqlMessage });
      } else {
        cb({ message: "Added Succesfully" });
      }
    }
  );
};

module.exports = student_subjects;
