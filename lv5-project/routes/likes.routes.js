const authMiddleware = require("../middlewares/auth-middleware");
const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const likesController = new LikesController();

router.post("/:postId/like", authMiddleware, likesController.addLike);
router.delete("/:postId/un-like", authMiddleware, likesController.deleteLike);

module.exports = router;
