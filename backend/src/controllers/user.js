const { Op } = require("sequelize");
const { VideoLike, Video, User, Subscription, View } = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");
const Course = require("../models/Course");

exports.getFeed = asyncHandler(async (req, res, next) => {
  const subscribedTo = await Subscription.findAll({
    where: {
      subscriber: req.user.id,
    },
  });

  const subscriptions = subscribedTo.map((sub) => sub.subscribeTo);

  const feed = await Video.findAll({
    include: {
      model: User,
      attributes: ["id", "avatar", "username"],
    },
    where: {
      userId: {
        [Op.in]: subscriptions,
      },
    },
    order: [["createdAt", "DESC"]],
  });

  if (!feed.length) {
    return res.status(200).json({ success: true, data: feed });
  }

  feed.forEach(async (video, index) => {
    const views = await View.count({ where: { videoId: video.id } });
    video.setDataValue("views", views);

    if (index === feed.length - 1) {
      return res.status(200).json({ success: true, data: feed });
    }
  });
});
exports.recommendedCourses = asyncHandler(async (req, res, next) => {
  const courses  = await Course.findAll({
    attributes: [
      "id",
      "title",
      "description",
	"price",
      "createdAt",
    ],
    include: [{ model: User, attributes: ["id", "avatar", "username"] }],
    order: [["createdAt", "DESC"]],
  })
    return res.status(200).json({ success: true, data: courses });
});

exports.recommendChannels = asyncHandler(async (req, res, next) => {
  const channels = await User.findAll({
		limit: 10,
    attributes: ["id", "username", "avatar", "channelDescription"],
    where: {
      id: {
        [Op.not]: req.user.id,
      },
    },
  });

  if (!channels.length)
    return res.status(200).json({ success: true, data: channels });

  channels.forEach(async (channel, index) => {
    const subscribersCount = await Subscription.count({
      where: { subscribeTo: channel.id },
    });
    channel.setDataValue("subscribersCount", subscribersCount);

    const isSubscribed = await Subscription.findOne({
      where: {
        subscriber: req.user.id,
        subscribeTo: channel.id,
      },
    });

    channel.setDataValue("isSubscribed", !!isSubscribed);

    const videosCount = await Video.count({ where: { userId: channel.id } });
    channel.setDataValue("videosCount", videosCount);

    if (index === channels.length - 1) {
      return res.status(200).json({ success: true, data: channels });
    }
  });
});

exports.getLikedVideos = asyncHandler(async (req, res, next) => {
  return getVideos(VideoLike, req, res, next);
});

exports.getHistory = asyncHandler(async (req, res, next) => {
  return getVideos(View, req, res, next);
});

const getVideos = async (model, req, res, next) => {
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
