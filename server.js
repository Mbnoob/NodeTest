//..................................................all handellings............................................
require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const app = express();
const joi = require("joi");
const port = process.env.PORT;
app.use(express.json());

//..................................................MySQL Connections..........................................
const myconnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

myconnection.connect((err) => {
  if (!err) {
    console.log("connected Succesfully");
  } else {
    console.log(err);
  }
});

//................................................students data posted ........................................

app.post("/students/insert", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const registration_no = req.body.registration_no;

  const studentsSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().min(18).max(60).required(),
    city: joi.string().required(),
    dob: joi.date().max("2022-01-01").iso().required(),
    gender: joi.string().required().valid("Male", "Female"),
    phone_no: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid ! phone number must have at last 10 characters long",
      }),
    registration_no: joi
      .string()
      .regex(/^WB[0-9]{13}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid ! registration number must have at last 15 characters long",
      }),
  });

  try {
    const values = await studentsSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    myconnection.query(
      "INSERT INTO students (`name`, `age`, `dob`, `gender`, `city`, `phone_no`, `registration_no`) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [name, age, dob, gender, city, phone_no, registration_no],
      (err, results) => {
        if (err) {
          res.status(404).json({ status: 404, message: err.sqlMessage });
        } else {
          res.status(200).json({ message: "Posted Succesfully" });
        }
      }
    );
  } catch (err) {
    let errors = [];
    err.details.forEach((element) => {
      errors.push({ key: element.path[0], valu: element.message });
    });
    res.status(404).json({ errors: errors, message: err.message });
  }
});

//................................................students data updated........................................

app.put("/students/:id", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const registration_no = req.body.registration_no;

  const studentsSchema = joi.object({
    name: joi.string().required(),
    age: joi.number().min(18).max(60).required(),
    city: joi.string().required(),
    dob: joi.date().max("2022-01-01").iso().required(),
    gender: joi.string().required().valid("Male", "Female"),
    phone_no: joi
      .string()
      .regex(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid ! phone number must have at last 10 characters long",
      }),
    registration_no: joi
      .string()
      .regex(/^WB[0-9]{13}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid ! registration number must have at last 15 characters long",
      }),
  });

  try {
    const value = await studentsSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    myconnection.query(
      "UPDATE `students` SET `name`=?,`age`=? ,`dob`=? ,`gender`=?,`city`=? ,`phone_no`=? ,`registration_no`=? ,`updated_at`=CURRENT_TIMESTAMP WHERE id =?",
      [name, age, dob, gender, city, phone_no, registration_no, req.params.id],
      (err, results) => {
        if (err) {
          res.status(404).json({ status: 404, message: err.sqlMessage });
        } else {
          res.status(201).json({ message: "Updated Succesfully" });
        }
      }
    );
  } catch (err) {
    let error = [];
    err.details.forEach((element) => {
      error.push({ key: element.path[0], valu: element.message });
    });
    res.status(404).json({ errors: error, message: err.message });
  }
});

//................................................students all data get......................................

app.get("/students/get", (req, res) => {
  myconnection.query("SELECT * FROM `students`", (err, results) => {
    if (err) {
      throw err;
    } else {
      res.send(results);
    }
  });
});

//.........................................student table: user get data by id..................................

app.get("/students/get/:id", (req, res) => {
  myconnection.query(
    "SELECT * FROM `students` WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (!results.length) {
        res.status(404).json({ Error: "Record Not Found" });
      } else {
        res.send(results);
      }
    }
  );
});

//.........................................data deleted from students tables...................................

app.delete("/students/delete/:id", (req, res) => {
  myconnection.query(
    "DELETE FROM `students` WHERE id =?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(401).json({ message: "Something went worng" });
      } else {
        res.status(200).json({ message: "user data deleted succesfully" });
      }
    }
  );
});

//...........................................Starting the part of subjects....................................
// ....................................To get all the data from subjects tables...............................
app.get("/subjects/get", (req, res) => {
  myconnection.query("SELECT * FROM `subjects`", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

//................................To get data by using :id from the subjects tables............................

app.get("/subjects/get/:id", (req, res) => {
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
});

//....................................To insert data(post) in the sunjects tables..............................
app.post("/subjects/insert", async (req, res) => {
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
});

//.......................................To update data in subjects table......................................
app.put("/subjects/:id", async (req, res) => {
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
});

//......................................To delete data from subject tables.....................................
app.delete("/subjects/delete/:id", (req, res) => {
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
});

//....................................Started the part of student_subjects.....................................
//......................................To Post data in student_subjects.......................................
app.post("/studentSubjects/post", async (req, res) => {
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
});
//.............................................server status...................................................
app.listen(port, (err) => {
  if (!err) {
    console.log("server is runnig on port no:", port);
  } else {
    console.log(err);
  }
});
