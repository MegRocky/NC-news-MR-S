const { insertCommentsByArticleId } = require("../models/model-insert-comment");

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
