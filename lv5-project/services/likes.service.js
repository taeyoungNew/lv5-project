const LikesRepositories = require("../repositories/likes.repository");

class LikesService {
  likesRepositories = new LikesRepositories();

  getPost = async postId => {
    const getPost = await this.likesRepositories.getPost(postId);
    return getPost;
  };
  ExLike = async (userId, postId) => {
    const exLike = await this.likesRepositories.ExLike(userId, postId);
    return exLike;
  };

  addLike = async (userId, postId) => {
    const ExLike = await this.ExLike(userId, postId);
    if (ExLike) {
      throw new Error("이미 좋아요를 누른 게시물입니다.");
    }
    await this.likesRepositories.addLike(userId, postId);
  };

  deleteLike = async (userId, postId) => {
    const ExLike = await this.ExLike(userId, postId);
    if (!ExLike) {
      throw new Error("이미 좋아요를 취소한 게시물입니다..");
    }
    await this.likesRepositories.deleteLike(userId, postId);
  };
}

module.exports = LikesService;
