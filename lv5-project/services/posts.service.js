const PostsRepositories = require("../repositories/posts.repository");

class PostsService {
  postsRepositories = new PostsRepositories();
  createPosts = async (userId, title, content) => {
    const createPosts = await this.postsRepositories.createPost(userId, title, content);
    return {
      title: createPosts.title,
      content: createPosts.content
    };
  };

  getPost = async postId => {
    const getPost = await this.postsRepositories.getPost(postId);
    return getPost;
  };

  getAllPosts = async () => {
    const getAllPosts = await this.postsRepositories.getAllPosts();
    return getAllPosts;
  };

  updatePost = async (postId, title, content) => {
    const updatePost = await this.postsRepositories.updatePost(postId, title, content);

    return updatePost;
  };

  deletePost = async postId => {
    await this.postsRepositories.deletePost(postId);
  };
}

module.exports = PostsService;
