const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");
const postsRouter = require("./posts.routes");
const commentsRouter = require("./comments.routes");
const likesRouter = require("./likes.routes");

router.use("/users/", usersRouter);
router.use("/auth", authRouter);
router.use("/posts", postsRouter);
router.use("/post", commentsRouter);
router.use("/likes", likesRouter);

module.exports = router;
