const articleRouter = require("express").Router();
const {
  getArticleById,
  getArticles,
  getCommentsByArticleId,
} = require("../controllers/control-get-api.js");
const {
  patchVotesByArticleId,
} = require("../controllers/control-patch-api.js");

const {
  postCommentByArticleID,
} = require("../controllers/control-post-api.js");

articleRouter.get("/", getArticles);

articleRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchVotesByArticleId);

articleRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleID);

module.exports = articleRouter;
