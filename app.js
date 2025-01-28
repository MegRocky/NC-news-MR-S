const express = require("express");
const app = express();
app.use(express.json());
const {
  getApi,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require("./controllers/control-get-api.js");
const {
  internalServerError,
  badRequest,
  idNotFound,
} = require("./error-handling.js");
const { postCommentByArticleID } = require("./controllers/control-post-api.js");
const { patchVotesByArticleId } = require("./controllers/control-patch-api.js");

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleID);

app.patch("/api/articles/:article_id", patchVotesByArticleId);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "URL not found" });
});

app.use(badRequest);
app.use(idNotFound);
app.use(internalServerError);
module.exports = app;
