const {
  updateVotesByArticleId,
  updateVotesByCommentId,
} = require("../models/model-update-vote");

exports.patchVotesByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const increment = req.body.inc_votes;
  updateVotesByArticleId(articleId, increment)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotesByCommentId = (req, res, next) => {
  const commentId = req.params.comment_id;
  const increment = req.body.inc_votes;
  updateVotesByCommentId(commentId, increment)
    .then((comment) => {
      res.status(200).send({ comment: comment });
    })
    .catch((err) => {
      next(err);
    });
};
