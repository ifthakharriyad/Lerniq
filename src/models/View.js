const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define("CourseVideo", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  });
