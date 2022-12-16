const students = require("../models/students");
const { genSaltSync, hashSync } = require("bcrypt");
const joi = require("joi");

const userList = (req, res) => {
  students.findAll((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const userlistbyId = (req, res) => {
  students.findbyId(req.params.id, (err, results) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(results);
    }
  });
};

const addUsers = (req, res) => {
  let data = req.body;
  const salt = genSaltSync(10);
  data.passwords = hashSync(data.passwords, salt);
  students.createUsers(data, (err, results) => {
    if (err) {
      res.status(406).json(err);
    } else {
      res.json(results);
    }
  });
};

const updateStudents = (req, res) => {
  let data = req.body;
  const salt = genSaltSync(10);
  data.passwords = hashSync(data.passwords, salt);
  students.updateUsers(data, req.params.id, (response) => {
    if (response) {
      return res.json(response);
    } else {
      return;
    }
  });
};

const userDeletbyid = (req, res) => {
  students.deletebyID(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  userList,
  userlistbyId,
  addUsers,
  updateStudents,
  userDeletbyid,
};
