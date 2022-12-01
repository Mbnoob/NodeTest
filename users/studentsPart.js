// const myconnection = require("../config/db_config");
const students = require("../models/students");
const joi = require("joi");

const userList = (req,res)=>{
  students.findAll((err,results)=>{
    if (err) {
      res.send(err)
    } else {
      res.send(results)
    }
  })
}

const userlistbyId = (req,res)=>{
   students.findbyId(req.params.id,(err,results)=>{
    if (err) {
      res.send(err)
    } else {
      res.send(results)
    }
  })
}



//   studentsData_insert: async (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const dob = req.body.dob;
//     const gender = req.body.gender;
//     const city = req.body.city;
//     const phone_no = req.body.phone_no;
//     const registration_no = req.body.registration_no;

//     const studentsSchema = joi.object({
//       name: joi.string().required(),
//       age: joi.number().min(18).max(60).required(),
//       city: joi.string().required(),
//       dob: joi.date().max("2022-01-01").iso().required(),
//       gender: joi.string().required().valid("Male", "Female"),
//       phone_no: joi
//         .string()
//         .regex(/^[0-9]{10}$/)
//         .required()
//         .messages({
//           "string.pattern.base":
//             "Invalid ! phone number must have at last 10 characters long",
//         }),
//       registration_no: joi
//         .string()
//         .regex(/^WB[0-9]{13}$/)
//         .required()
//         .messages({
//           "string.pattern.base":
//             "Invalid ! registration number must have at last 15 characters long",
//         }),
//     });

//     try {
//       const values = await studentsSchema.validateAsync(req.body, {
//         abortEarly: false,
//       });
//       myconnection.query(
//         "INSERT INTO students (`name`, `age`, `dob`, `gender`, `city`, `phone_no`, `registration_no`) VALUES(?, ?, ?, ?, ?, ?, ?)",
//         [name, age, dob, gender, city, phone_no, registration_no],
//         (err, results) => {
//           if (err) {
//             res.status(404).json({ status: 404, message: err.sqlMessage });
//           } else {
//             res.status(200).json({ message: "Posted Succesfully" });
//           }
//         }
//       );
//     } catch (err) {
//       let errors = [];
//       err.details.forEach((element) => {
//         errors.push({ key: element.path[0], valu: element.message });
//       });
//       res.status(404).json({ errors: errors, message: err.message });
//     }
//   },

//   studentsData_updated: async (req, res) => {
//     const name = req.body.name;
//     const age = req.body.age;
//     const dob = req.body.dob;
//     const gender = req.body.gender;
//     const city = req.body.city;
//     const phone_no = req.body.phone_no;
//     const registration_no = req.body.registration_no;

//     const studentsSchema = joi.object({
//       name: joi.string().required(),
//       age: joi.number().min(18).max(60).required(),
//       city: joi.string().required(),
//       dob: joi.date().max("2022-01-01").iso().required(),
//       gender: joi.string().required().valid("Male", "Female"),
//       phone_no: joi
//         .string()
//         .regex(/^[0-9]{10}$/)
//         .required()
//         .messages({
//           "string.pattern.base":
//             "Invalid ! phone number must have at last 10 characters long",
//         }),
//       registration_no: joi
//         .string()
//         .regex(/^WB[0-9]{13}$/)
//         .required()
//         .messages({
//           "string.pattern.base":
//             "Invalid ! registration number must have at last 15 characters long",
//         }),
//     });

//     try {
//       const value = await studentsSchema.validateAsync(req.body, {
//         abortEarly: false,
//       });
//       myconnection.query(
//         "UPDATE `students` SET `name`=?,`age`=? ,`dob`=? ,`gender`=?,`city`=? ,`phone_no`=? ,`registration_no`=? ,`updated_at`=CURRENT_TIMESTAMP WHERE id =?",
//         [
//           name,
//           age,
//           dob,
//           gender,
//           city,
//           phone_no,
//           registration_no,
//           req.params.id,
//         ],
//         (err, results) => {
//           if (err) {
//             res.status(404).json({ status: 404, message: err.sqlMessage });
//           } else {
//             res.status(201).json({ message: "Updated Succesfully" });
//           }
//         }
//       );
//     } catch (err) {
//       let error = [];
//       err.details.forEach((element) => {
//         error.push({ key: element.path[0], valu: element.message });
//       });
//       res.status(404).json({ errors: error, message: err.message });
//     }
//   },

//   studentsData_deleted: (req, res) => {
//     myconnection.query(
//       "DELETE FROM `students` WHERE id =?",
//       [req.params.id],
//       (err, results) => {
//         if (err) {
//           res.status(401).json({ message: "Something went worng" });
//         } else {
//           res.status(200).json({ message: "user data deleted succesfully" });
//         }
//       }
//     );
//   },
// };

module.exports = {userList,userlistbyId};
