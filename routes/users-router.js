const {
  getUsers,
  getUsersByUsername,
} = require("../controllers/control-get-api");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:username", getUsersByUsername);

module.exports = usersRouter;
