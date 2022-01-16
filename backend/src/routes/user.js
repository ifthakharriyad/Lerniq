const express = require("express");
const router = express.Router();
const {
  editUser,
  searchUser,
  getProfile,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.route("/").put(protect, editUser);
router.route("/search").get(protect, searchUser);
router.route("/:id").get(protect, getProfile);

module.exports = router;