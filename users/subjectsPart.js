const myconnection = require("../config/db_config");
const joi = require("joi");

const subjectsPart = {
  subjectGet_all: (req, res) => {
    myconnection.query("SELECT * FROM `subjects`", (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    });
  },

  subjectGet_id: (req, res) => {
    myconnection.query(
      "SELECT * FROM `subjects` WHERE id =?",
      [req.params.id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.send(results);
        }
      }
    );
  },

  subjectData_insert: async (req, res) => {
    const subjectSchema = joi.object({
      sub_name: joi.string().required(),
      sub_code: joi.number().min(1).required(),
      start_time: joi
        .string()
        .regex(/^([0-1]{1}[0-9]{1}):([0-6]{2}([AaPp][Mm]{1}))$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'Start-Time' is Invalid format ! criteria dose not match",
        }),
      end_time: joi
        .string()
        .regex(/^([0-1]{1}[0-9]{1}):([0-6]{2}([AaPp][Mm]{1}))$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'End-Time' is Invalid format ! criteria dose not match",
        }),
      room_no: joi
        .string()
        .regex(/^[A-Za-z]{1}[0-9]{2}$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'Room Number' is Invalid format ! criteria dose not match",
        }),
    });

    const sub_name = req.body.sub_name;
    const sub_code = req.body.sub_code;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const room_no = req.body.room_no;

    try {
      const values = await subjectSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      myconnection.query(
        "INSERT INTO `subjects`(`sub_name`, `sub_code`, `start_time`, `end_time`, `room_no`)VALUES (?, ?, ?, ?, ?)",
        [sub_name, sub_code, start_time, end_time, room_no],
        (err, results) => {
          if (err) {
            res.status(404).json({ status: 404, message: err.sqlMessage });
          } else {
            res.status(200).json({ message: "Posted sucessful" });
          }
        }
      );
    } catch (err) {
      let error = [];
      err.details.forEach((element) => {
        error.push({ key: element.path[0], value: element.message });
      });
      res.status(404).json({ errors: error, message: err.message });
    }
  },

  subjectData_updated :  async (req, res) => {
    const sub_name = req.body.sub_name;
    const sub_code = req.body.sub_code;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const room_no = req.body.room_no;
  
    const subjectSchema = joi.object({
      sub_name: joi.string().required(),
      sub_code: joi.number().min(1).required(),
      start_time: joi
        .string()
        .regex(/^([0-1]{1}[0-9]{1}):([0-6]{2}([AaPp][Mm]{1}))$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'Start-Time' is Invalid format ! criteria dose not match",
        }),
      end_time: joi
        .string()
        .regex(/^([0-1]{1}[0-9]{1}):([0-6]{2}([AaPp][Mm]{1}))$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'end_time' is Invalid format ! criteria dose not match",
        }),
      room_no: joi
        .string()
        .regex(/^[A-Za-z]{1}[0-9]{2}$/)
        .required()
        .messages({
          "string.pattern.base":
            " 'Room Number' is Invalid format ! criteria dose not match",
        }),
    });
    try {
      const value = await subjectSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      myconnection.query(
        "UPDATE `subjects` SET `sub_name`=?, `sub_code`=?,`start_time`=?,`end_time`=?,`room_no`=?, `updated_at`= CURRENT_TIMESTAMP WHERE id= ?",
        [sub_name, sub_code, start_time, end_time, room_no, req.params.id],
        (err, results) => {
          if (err) {
            res.status(404).json({ status: 404, message: err.sqlMessage });
          } else {
            res.status(200).json({ message: "Updated Sucessfully" });
          }
        }
      );
    } catch (err) {
      let error = [];
      err.details.forEach((element) => {
        error.push({ key: element.path[0], value: element.message });
      });
      res.status(404).json({ errors: error, message: err.message });
    }
  },

  subjectData_deleted : (req, res) => {
    myconnection.query(
      "DELETE FROM `subjects` WHERE id = ?",
      [req.params.id],
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: "Deleted Succesfully" });
        }
      }
    );
  }

};

module.exports = subjectsPart;
