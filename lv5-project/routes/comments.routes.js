const authMiddleware = require("../middlewares/auth-middleware");
const express = require("express");
const router = express.Router();

const CommentsConroller = require("../controllers/comments.controller");
const commentsController = new CommentsConroller();

router.post("/:postId/comments", authMiddleware, commentsController.createComments);
router.get("/:postId/comments", commentsController.getAllComments);
router.put("/comments/:commentId", authMiddleware, commentsController.updateComment);
router.delete("/comments/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
