const { updateVotesByArticleId } = require("../models/model-update-vote");

exports.patchVotesByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const newComment = req.body.inc_votes;
  updateVotesByArticleId(articleId, newComment)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
