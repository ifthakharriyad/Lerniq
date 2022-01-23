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
    const courseVideoIds = await CourseVideo.findAll({
      attributes:['videoId'],
      where:{
        courseId:req.params.id
      },
      raw:false
    })

    const promiseArray = courseVideoIds.map(i => {
      return Video.findByPk(i.videoId,{
        attributes:['id', 'title', 'description', 'url', 'thumbnail'],
        include:{
          model:User
        }
      } )
    });
    const courseVideos = await Promise.all(promiseArray)
    const c = {
      info:course,
      videos:courseVideos
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

// function createVideoPackage(videos){
//   const videoPackage=[];
//   for (var i=0; i<videos.length; i++){
//     let current= videos[i]
//     let next;
//     if(i!=videos.length-1){next = videos[i+1]}
//     const a = {
//       current,
//       next:next
//     }
//     videoPackage.push(a)
//   }
// return videoPackage
// }