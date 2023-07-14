const authMiddleware = require("../middlewares/auth-middleware");
const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.post("/", authMiddleware, postsController.postCreate);
router.get("/", postsController.allPosts);
router.get("/:postId", postsController.getPost);
router.put("/:postId", authMiddleware, postsController.updatePost);
router.delete("/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
