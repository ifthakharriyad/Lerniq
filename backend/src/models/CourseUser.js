const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
  sequelize.define("CourseUser", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
  });
