const { Users, UserInfos, Posts, sequelize, Likes } = require("../models");
const { Transaction } = require("sequelize");

class LikesRepositories {
  getPost = async postId => {
    const post = await Posts.findOne({
      where: { postId }
    });

    return post;
  };

  ExLike = async (userId, postId) => {
    const isExLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId }
    });

    return isExLike;
  };
  addLike = async (userId, postId) => {
    await Likes.create({
      UserId: userId,
      PostId: postId
    });
  };

  deleteLike = async (userId, postId) => {
    await Likes.destroy({
      where: {
        UserId: userId,
        PostId: postId
      }
    });
  };
}

module.exports = LikesRepositories;
