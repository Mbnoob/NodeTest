const myconnection = require("../config/db_config");
const joi = require("joi");

const subject_studentPart = {
    foreigenKey_update: async (req, res) => {
        const students_id = req.body.students_id;
        const subject_id = req.body.subject_id;
      
        const student_subjectsSchema = joi.object({
          students_id: joi.number().required(),
          subject_id: joi.number().required(),
        });
      
        try {
          const value = await student_subjectsSchema.validateAsync(req.body, {
            abortEarly: false,
          });
      
          myconnection.query(
            "INSERT INTO `student_subjects`(`students_id`, `subject_id`) VALUES (?, ?)",
            [students_id, subject_id],
            (err, results) => {
              if (err) {
                res.status(404).json({ status: 404, message: err.sqlMessage });
              } else {
                res.status(200).json({ message: "Posted Succesfully" });
              }
            }
          );
        } catch (err) {
          let error = [];
          err.details.forEach((element) => {
            error.push({ key: element.path[0], value: element.message });
          });
          res.status(404).json({ errors: error, messages: err.message });
        }
      }
};

module.exports = subject_studentPart;