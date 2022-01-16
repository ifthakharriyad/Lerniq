const { Op } = require("sequelize");
const {
  User,
  Video,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["id", "username", "avatar"],
      },
    ],
  });

  if (!video) {
    return next({
      message: `No video found for ID - ${req.params.id}`,
      statusCode: 404,
    });
  }

  res.status(200).json({ success: true, data: video });
});


exports.searchVideo = asyncHandler(async (req, res, next) => {
  if (!req.query.searchterm) {
    return next({ message: "Please enter the searchterm", statusCode: 400 });
  }

  const videos = await Video.findAll({
    include: { model: User, attributes: ["id", "avatar", "username"] },
    where: {
      [Op.or]: {
        title: {
          [Op.substring]: req.query.searchterm,
        },
        description: {
          [Op.substring]: req.query.searchterm,
        },
      },
    },
  });

    return res.status(200).json({ success: true, data: videos });
  });