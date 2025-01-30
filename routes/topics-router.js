const { getTopics } = require("../controllers/control-get-api");

const topicsRouter = require("express").Router();

topicsRouter.get("/", getTopics);

module.exports = topicsRouter;
