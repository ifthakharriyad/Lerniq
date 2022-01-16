const pg = require("pg");
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const VideoModel = require("./models/Video");
const CourseModel = require("./models/Course");
const CourseUserModel = require("./models/CourseUser");
const CourseVideoModel = require("./models/CourseVideo");

pg.defaults.ssl = true;
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

(async () =>{try{ await sequelize.sync({ alter: true })}
catch(e){ console.log(e)};		
})();

const User = UserModel(sequelize, DataTypes);
const Video = VideoModel(sequelize, DataTypes);
const Course = CourseModel(sequelize, DataTypes);
const CourseUser = CourseUserModel(sequelize, DataTypes);
const CourseVideo = CourseVideoModel(sequelize, DataTypes);

// video - user association
Video.belongsTo(User, { foreignKey: "userId" });

// User Course association
User.belongsToMany(Course, { through: CourseUser, foreignKey: "userId" });
Course.belongsToMany(User, { through: CourseUser, foreignKey: "courseId" });

// Video Course association
Video.belongsToMany(Course, { through: CourseVideo, foreignKey: "videoId" });
Course.belongsToMany(Video, { through: CourseVideo, foreignKey: "courseId" });

module.exports = {
  User,
  Video,
    Course,
    CourseVideo,
  CourseUser
};
