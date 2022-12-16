const myconnection = require("../config/db_config");

const find = () => {};

find.username = (name, cb) => {
  myconnection.query(
    "SELECT students.name,students.age, students.dob, students.gender, students.city, students.phone_no, students.email, students.registration_no,subjects.sub_name,subjects.sub_code, subjects.start_time, subjects.end_time, subjects.room_no FROM students JOIN student_subjects ON students.id = student_subjects.students_id JOIN subjects ON subjects.id = student_subjects.subject_id WHERE students.name = ?",
    [name],
    (err, results) => {
      if (err) {
        return cb(err);
      } else {
        return cb(results);
      }
    }
  );
};

module.exports = { find };
