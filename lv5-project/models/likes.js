"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: "UserId",
        sourceKey: "userId",
      });
      this.belongsTo(models.Posts, {
        foreignKey: "PostId",
        sourceKey: "postId",
      });
    }
  }
  Likes.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // Users 모델을 참조
          key: "userId", // Users 모델의 userId를 참조
        },
      },
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Likes",
    }
  );
  return Likes;
};
