const express = require("express");
const router = express.Router();
const { recommendedCourses } = require("../controllers/user");

const {
  getCourse,
} = require("../controllers/course");

router.route("/").get(recommendedCourses);
router.route("/:id").get(getCourse);
module.exports = router;
