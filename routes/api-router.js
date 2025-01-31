const express = require("express");
const apiRouter = express.Router();
const articleRouter = require("./articles-router.js");
const topicsRouter = require("./topics-router.js");
const commentsRouter = require("./comments-router.js");
const usersRouter = require("./users-router.js");

const { getApi } = require("../controllers/control-get-api.js");

apiRouter.get("/", getApi);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
