const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();

  addLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;

      await this.likesService.addLike(userId, postId);

      res.status(200).json({ messasge: "좋아요가 추가되었습니다." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteLike = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      await this.likesService.deleteLike(userId, postId);

      res.status(200).json({ messasge: "좋아요를 취소했습니다." });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = LikesController;
