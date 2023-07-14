const PostsService = require("../services/posts.service");

class PostsController {
  postService = new PostsService();
  postCreate = async (req, res, next) => {
    const { userId } = res.locals.user;
    const blank_pattern = /^\s+|\s+$/g;
    const { title, content } = req.body;
    if (title === "" || blank_pattern.test(title)) {
      res.status(400).json({ errMessasge: "제목을 입력해주세요." });
    }

    const createPosts = await this.postService.createPosts(userId, title, content);
    console.log("createPosts = ", createPosts);
    res.status(200).json({ message: "게시글을 등록하였습니다." });
  };

  getPost = async (req, res, next) => {
    const { postId } = req.params;
    const getPost = await this.postService.getPost(postId);

    return res.status(200).json({ data: getPost });
  };

  allPosts = async (req, res, next) => {
    const getAllPosts = await this.postService.getAllPosts();

    return res.status(200).json({ datas: getAllPosts });
  };

  updatePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;
    const postData = await this.postService.getPost(postId);

    if (!postData) {
      return res.status(403).json({ errMsg: "게시글이 존재하지 않습니다." });
    }

    if (userId !== postData.UserId) {
      return res.status(403).json({ errMsg: "게시글의 수정권한이 없습니다." });
    }

    await this.postService.updatePost(postData.postId, title, content);

    return res.status(200).json({ message: "게시글이 수정되었습니다." });
  };

  deletePost = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const postData = await this.postService.getPost(postId);
    if (!postData) {
      return res.status(403).json({ errMsg: "게시글이 존재하지 않습니다." });
    }
    if (userId !== postData.UserId) {
      return res.status(403).json({ errMsg: "게시글의 삭제권한이 없습니다." });
    }

    await this.postService.deletePost(postData.postId);
    return res.status(200).json({ message: "게시글을 삭제하였습니다." });
  };
}

module.exports = PostsController;
