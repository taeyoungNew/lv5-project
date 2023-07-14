const express = require("express");
const router = express.Router();

const AuthConroller = require("../controllers/auth.controller");
const authControll = new AuthConroller();

router.post("/", authControll.authControll);

module.exports = router;
