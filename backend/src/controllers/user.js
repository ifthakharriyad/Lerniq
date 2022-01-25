const { Op } = require("sequelize");
const { Video, Course, User, View } = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.recommendedCourses = asyncHandler(async (req, res, next) => {
  const courses  = await Course.findAll({
    attributes: [
      "id",
      "title",
      "description",
	"price",
      "createdAt",
      "thumbnail",
      "cover",
      "avatar"
    ],
    include: [{ model: User, attributes: ["id", "avatar", "username"] }],
    order: [["createdAt", "DESC"]],
  })
    return res.status(200).json({ success: true, data: courses });
});

const getVideos = async (model, req, res) => {
  const videoRelations = await model.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "ASC"]],
  });

  const videoIds = videoRelations.map((videoRelation) => videoRelation.videoId);

  const videos = await Video.findAll({
    attributes: ["id", "title", "description", "createdAt", "thumbnail", "url"],
    include: {
      model: User,
      attributes: ["id", "username", "avatar"],
    },
    where: {
      id: {
        [Op.in]: videoIds,
      },
    },
  });

  if (!videos.length) {
    return res.status(200).json({ success: true, data: videos });
  }

  videos.forEach(async (video, index) => {
    const views = await View.count({ where: { videoId: video.id } });
    video.setDataValue("views", views);

    if (index === videos.length - 1) {
      return res.status(200).json({ success: true, data: videos });
    }
  });
};
exports.editUser = asyncHandler(async (req, res, next) => {
  await User.update(req.body, {
    where: { id: req.user.id },
  });

  const user = await User.findByPk(req.user.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "channelDescription",
      "avatar",
      "cover",
      "email",
    ],
  });

  res.status(200).json({ success: true, data: user });
});

exports.searchUser = asyncHandler(async (req, res, next) => {
  if (!req.query.searchterm) {
    return next({ message: "Please enter your search term", statusCode: 400 });
  }

  const users = await User.findAll({
    attributes: ["id", "username", "avatar", "channelDescription"],
    where: {
      username: {
        [Op.substring]: req.query.searchterm,
      },
    },
  });

  if (!users.length)
    return res.status(200).json({ success: true, data: users });

  users.forEach(async (user, index) => {
    const subscribersCount = await Subscription.count({
      where: { subscribeTo: user.id },
    });

    const videosCount = await Video.count({
      where: { userId: user.id },
    });

    const isSubscribed = await Subscription.findOne({
      where: {
        [Op.and]: [{ subscriber: req.user.id }, { subscribeTo: user.id }],
      },
    });

    const isMe = req.user.id === user.id;

    user.setDataValue("subscribersCount", subscribersCount);
    user.setDataValue("videosCount", videosCount);
    user.setDataValue("isSubscribed", !!isSubscribed);
    user.setDataValue("isMe", isMe);

    if (index === users.length - 1) {
      return res.status(200).json({ success: true, data: users });
    }
  });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "cover",
      "avatar",
      "email",
      "channelDescription",
    ],
  });

  if (!user) {
    return next({
      message: `No user found for ID - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const isMe = req.user.id === req.params.id;
  user.setDataValue("isMe", isMe);

  const videos = await Video.findAll({
    where: { userId: req.params.id },
    attributes: ["id", "thumbnail", "title", "createdAt"],
  });

  if (!videos.length)
    return res.status(200).json({ success: true, data: user });

  videos.forEach(async (video, index) => {

    if (index === videos.length - 1) {
      user.setDataValue("videos", videos);
      return res.status(200).json({ success: true, data: user });
    }
  });
});

