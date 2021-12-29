const express = require("express");
const router = express.Router();

const {
  getVideo,
} = require("../controllers/video");

router.route("/:id").get(getVideo);

module.exports = router;
