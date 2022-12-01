const {userList,userlistbyId} = require("../users/studentsPart");
const subjectsPart = require("../users/subjectsPart");
const subject_studentPart = require("../users/subject&studentPart");
const express = require("express");
const router = express.Router();

//..........Students Part............
router.get("/get", userList);

router.get("/get/:id", userlistbyId);

// router.post("/insert", studentsPart.studentsData_insert);

// router.put("/:id", studentsPart.studentsData_updated);

// router.delete("/delete/:id", studentsPart.studentsData_deleted);

// //.........Subjects Part..............

// router.get("/sb/get", subjectsPart.subjectGet_all);

// router.get("/sb/get/:id", subjectsPart.subjectGet_id);

// router.post("/sb/insert", subjectsPart.subjectData_insert);

// router.put("/sb/:id", subjectsPart.subjectData_updated);

// router.delete("/sb/delete/:id", subjectsPart.subjectData_deleted);

// //.........student_subjects.............

// router.post("/post", subject_studentPart.foreigenKey_update);

module.exports = router;
