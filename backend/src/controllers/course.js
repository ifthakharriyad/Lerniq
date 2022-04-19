const { Op } = require("sequelize");
const {
  User,
  Course,
  CourseVideo,
  Video
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

try{
  exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "avatar"],
        },
      ],
    });
    const videos = await Video.findAll({
      where: { userId: "872ebc66-1468-4d33-aa8f-3cf63ebe6220" },
      order:[['isFree', 'ASC']],
      attributes: ["id", "thumbnail", "title", "createdAt"],
    });
    const c = {
      info:course,
      videos:videos
    }
    if (!course) {
      return next({
        message: `No course found for ID - ${req.params.id}`,
        statusCode: 404,
      });
    }
    res.status(200).json({ success: true, data: c});
  });
  
}catch(err){
  console.error(err)
}