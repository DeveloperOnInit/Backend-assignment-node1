
const express = require("express");
const router = express.Router();

const studentService = require("../../services/service");


router.post("/addSchool", studentService.addDetailes);

router.get("/listSchools", studentService.getDetailes);





module.exports = router;






