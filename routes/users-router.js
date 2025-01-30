const { getUsers } = require("../controllers/control-get-api");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);

module.exports = usersRouter;
