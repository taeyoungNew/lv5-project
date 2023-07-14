const CommentsService = require("../services/comments.service");

class CommentsController {
  commentsService = new CommentsService();
  createComments = async (req, res, next) => {
    const { content } = req.body;
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const post = await this.commentsService.getPost(postId);
    if (!post) {
      return res.status(412).json({ errMessage: "게시물이 없습니다." });
    }

    if (!content) {
      return res.status(412).json({ errMessage: "댓글 내용이 없습니다." });
    }

    await this.commentsService.createComment(userId, postId, content);
    return res.status(201).json({ message: "댓글이 달렸습니다." });
  };

  getAllComments = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const post = await this.commentsService.getPost(postId);
    if (!post) {
      return res.status(412).json({ errMessage: "게시물이 없습니다." });
    }

    const comments = await this.commentsService.getAllComments(userId, postId);

    return res.status(200).json({ datas: comments });
  };

  updateComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;
      const { content } = req.body;
      if (!content) {
        return res.status(412).json({ errMessage: "댓글수정 내용이 없습니다." });
      }
      await this.commentsService.updateComment(userId, commentId, content);
      return res.status(200).json({ message: "댓글이 수정되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errMessage: error });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { commentId } = req.params;
      await this.commentsService.deleteComment(userId, commentId);
      return res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
      res.status(400).json({ errMessage: error });
    }
  };
}

module.exports = CommentsController;
