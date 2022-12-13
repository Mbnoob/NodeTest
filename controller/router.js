const {
  userList,
  userlistbyId,
  addUsers,
  updateStudents,
  userDeletbyid,
} = require("../users/studentsPart");

const {
  subjectsList,
  subjListbyid,
  addSubjects,
  updateSubjects,
  deleteSubjects,
} = require("../users/subjectsPart");

const { addStu_sub } = require("../users/subject&studentPart");

const { userLogin } = require("../users/loginUsers");

const { checkToken } = require("../auth/validations");

const express = require("express");

const router = express.Router();

//..........Students Part............
router.get("/get", checkToken, userList);

router.get("/get/:id", checkToken, userlistbyId);

router.post("/insert", checkToken, addUsers);

router.delete("/delete/:id", checkToken, userDeletbyid);

router.put("/:id", checkToken, updateStudents);

//.........Subjects Part..............

router.get("/sb/get", checkToken, subjectsList);

router.get("/sb/get/:id", checkToken, subjListbyid);

router.post("/sb/insert", checkToken, addSubjects);

router.put("/sb/:id", checkToken, updateSubjects);

router.delete("/sb/delete/:id", checkToken, deleteSubjects);

//.........student_subjects.............

router.post("/post", checkToken, addStu_sub);

//.........student_subjects.............

router.post("/login", userLogin);

module.exports = router;