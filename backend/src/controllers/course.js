const { Op } = require("sequelize");
const {
  User,
  Course,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
    ],
  });

  if (!course) {
    return next({
      message: `No course found for ID - ${req.params.id}`,
      statusCode: 404,
    });
  }
  console.log("lllllll")
  res.status(200).json({ success: true, data: course });
});

