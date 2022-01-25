const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Course", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },  
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail:{
      type: DataTypes.STRING,
    },
    cover:{
      type: DataTypes.STRING
    },
    avatar:{
      type: DataTypes.STRING
    }
  });
};
