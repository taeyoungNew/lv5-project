const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/", usersController.createUsers);

module.exports = router;
