const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getArticleById,
} = require("./controllers/control-get-api.js");
const {
  internalServerError,
  badRequest,
  idNotFound,
} = require("./error-handling.js");

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(badRequest);
app.use(idNotFound);
app.use(internalServerError);
module.exports = app;
