const express = require("express");
const router = express.Router();
const { recommendedCourses } = require("../controllers/user");

const {
  getVideo,
} = require("../controllers/course");

router.route("/").get(recommendedCourses);
router.route("/course/:id").get(getVideo);
module.exports = router;
