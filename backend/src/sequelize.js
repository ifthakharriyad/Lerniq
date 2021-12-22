const pg = require("pg");
const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const VideoModel = require("./models/Video");
const VideoLikeModel = require("./models/VideoLike");
const CommentModel = require("./models/Comment");
const SubscriptionModel = require("./models/Subscription");
const ViewModel = require("./models/View");
const CourseModel = require("./models/Course");
const CourseUserModel = require("./models/CourseUser");
const CourseVideoModel = require("./models/CourseVideo");

pg.defaults.ssl = true;
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT
});

(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);
const Video = VideoModel(sequelize, DataTypes);
const VideoLike = VideoLikeModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Subscription = SubscriptionModel(sequelize, DataTypes);
const View = ViewModel(sequelize, DataTypes);
const Course = CourseModel(sequelize, DataTypes);
const CourseUser = CourseUserModel(sequelize, DataTypes);
const CourseVideo = CourseVideoModel(sequelize, DataTypes);

// video - user association
Video.belongsTo(User, { foreignKey: "userId" });

// likes association
User.belongsToMany(Video, { through: VideoLike, foreignKey: "userId" });
Video.belongsToMany(User, { through: VideoLike, foreignKey: "videoId" });

// comments association
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(User, { foreignKey: "userId" });

Video.hasMany(Comment, {
  foreignKey: "videoId",
});

// subscription association
User.hasMany(Subscription, {
  foreignKey: "subscribeTo",
});

// views association
User.belongsToMany(Video, { through: View, foreignKey: "userId" });
Video.belongsToMany(User, { through: View, foreignKey: "videoId" });

// User Course association
User.belongsToMany(Course, { through: CourseUser, foreignKey: "userId" });
Course.belongsToMany(User, { through: CourseUser, foreignKey: "courseId" });

// Video Course association
Video.belongsToMany(Course, { through: CourseVideo, foreignKey: "videoId" });
Course.belongsToMany(Video, { through: CourseVideo, foreignKey: "courseId" });

module.exports = {
  User,
  Video,
  VideoLike,
  Comment,
  Subscription,
    View,
    Course,
    CourseVideo,
  CourseUser
};
