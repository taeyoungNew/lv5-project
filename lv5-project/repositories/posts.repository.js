const { Users, UserInfos, Posts, sequelize } = require("../models");
const { Transaction } = require("sequelize");

class PostsRepositories {
  createPost = async (userId, title, content) => {
    const post = await Posts.create({ UserId: userId, title, content });
    return post;
  };
  getPost = async postId => {
    const post = await Posts.findOne({
      where: { postId }
    });

    return post;
  };

  getAllPosts = async () => {
    const posts = await Posts.findAll({
      order: [["createdAt", "DESC"]]
    });
    return posts;
  };

  updatePost = async (postId, title, content) => {
    const post = await Posts.update({ title: title, content: content }, { where: { postId } });
    return post;
  };

  deletePost = async postId => {
    await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostsRepositories;
