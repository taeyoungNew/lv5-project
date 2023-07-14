const CommentsRepositories = require("../repositories/comments.repository");

class CommentsService {
  commentsRepositories = new CommentsRepositories();
  getPost = async postId => {
    const getPost = await this.commentsRepositories.getPost(postId);
    return getPost;
  };
  getComment = async commentId => {
    const comment = await this.commentsRepositories.getComment(commentId);
    return comment;
  };
  createComment = async (userId, postId, content) => {
    await this.commentsRepositories.createComment(userId, postId, content);
  };

  getAllComments = async (userId, postId) => {
    const comments = await this.commentsRepositories.getAllComments(userId, postId);
    return comments;
  };

  updateComment = async (userId, commentId, content) => {
    const getComment = await this.getComment(commentId);
    console.log("getComment = ", getComment);
    if (!getComment) {
      throw new Error("해당 댓글이 존재하지 않습니다.");
    }
    const getPost = await this.getPost(getComment.PostId);
    if (!getPost) {
      throw new Error("해당 게시글이 존재하지 않습니다.");
    }
    await this.commentsRepositories.updateComment(userId, commentId, content);
  };

  deleteComment = async (userId, commentId) => {
    // console.log("commentId", commentId);
    const getComment = await this.getComment(commentId);
    // console.log("getComment = ", getComment);
    if (!getComment) {
      throw new Error("해당 댓글이 존재하지 않습니다.");
    }
    if (userId !== getComment.UserId) {
      throw new Error("댓글 삭제권한이 없습니다.");
    }
    const getPost = await this.getPost(getComment.PostId);
    if (!getPost) {
      throw new Error("해당 게시글이 존재하지 않습니다.");
    }

    await this.commentsRepositories.deleteComment(commentId);
  };
}

module.exports = CommentsService;
