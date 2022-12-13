const subjects = require("../models/subjects");

const subjectsList = (req, res) => {
  subjects.Findall((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const subjListbyid = (req, res) => {
  subjects.FindbyId(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

const addSubjects = (req, res) => {
  let data = req.body;
  subjects.insertSubject(data, (err, results) => {
    if (err) {
      res.status(406).json(err);
    } else {
      res.json(results);
    }
  });
};

const updateSubjects = (req, res) => {
  let data = req.body;
  subjects.updatedata(data, req.params.id, (err, results) => {
    if (err) {
      res.status(406).json(err);
    } else {
      res.json(results);
    }
  });
};
const deleteSubjects = (req,res)=>{
  subjects.deletedata(req.params.id,(err,results)=>{
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  subjectsList,
  subjListbyid,
  addSubjects,
  updateSubjects,
  deleteSubjects
};
