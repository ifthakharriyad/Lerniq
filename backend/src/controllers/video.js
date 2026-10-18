const { Op } = require("sequelize");
const {
  User,
  Video,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");
const axios = require('axios');

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

  // Build AMP fetch URL from environment variables. Do NOT hardcode tokens in source.
  if (!process.env.AMPFETCHENDPOINT) {
    return next({ message: "AMP fetch endpoint not configured", statusCode: 500 });
  }

  let ampUrl = `${process.env.AMPFETCHENDPOINT}?video=${video.id}`;
  if (process.env.AMPFETCH_TOKEN) ampUrl += `&token=${process.env.AMPFETCH_TOKEN}`;

  // Fetch the AMP URL. If the external request fails, return partial data but log the error.
  let fetchedData = null;
  try {
    const resp = await axios.get(ampUrl);
    fetchedData = resp.data;
  } catch (err) {
    // Avoid leaking sensitive details in the response. Let the error middleware handle it.
    console.error("AMP fetch failed:", err.message || err);
  }

  const a = {
    info: video,
    url: fetchedData,
  };
  res.status(200).json({ success: true, data: a });
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
