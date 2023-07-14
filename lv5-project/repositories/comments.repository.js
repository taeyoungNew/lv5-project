const { Users, UserInfos, Posts, sequelize, Comments } = require("../models");

class CommentsRepositories {
  getPost = async postId => {
    const post = await Posts.findOne({
      where: { postId }
    });

    return post;
  };
  getComment = async commentId => {
    const comment = await Comments.findOne({
      where: { id: commentId }
    });
    return comment;
  };
  createComment = async (userId, postId, content) => {
    await Comments.create({ UserId: userId, PostId: postId, content });
  };

  getAllComments = async (userId, PostId) => {
    const comments = await Comments.findAll({
      where: {
        PostId
      },
      order: [["createdAt", "DESC"]],
      attributes: ["UserId", "content", "createdAt"],
      include: [
        {
          model: Users,
          include: [
            {
              model: UserInfos,
              where: { UserId: userId },
              attributes: ["nickname"]
            }
          ]
        }
      ]
    });
    console.log("comments = ", comments);
    return comments;
  };

  updateComment = async (userId, commentId, content) => {
    await Comments.update({ content }, { where: { id: commentId } });
  };

  deleteComment = async commentId => {
    console.log("deleteComment = ", commentId);
    await Comments.destroy({ where: { id: commentId } });
  };
}

module.exports = CommentsRepositories;
