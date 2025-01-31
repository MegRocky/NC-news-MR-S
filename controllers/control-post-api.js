const { insertCommentsByArticleId } = require("../models/model-insert-comment");
const { insertNewArticle } = require("../models/model-insert-article.js");
exports.postCommentByArticleID = (req, res, next) => {
  const articleId = req.params.article_id;
  const newComment = req.body;
  insertCommentsByArticleId(articleId, newComment)
    .then((comment) => {
      res.status(201).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewArticle = (req, res, next) => {
  const newArticle = req.body;
  insertNewArticle(newArticle)
    .then((article) => {
      res.status(201).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
