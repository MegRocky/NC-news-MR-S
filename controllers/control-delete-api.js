const removeCommentByCommentId = require("../models/model-delete-comment");

exports.deleteCommentByCommentID = (req, res, next) => {
  const commentId = req.params.comment_id;
  return removeCommentByCommentId(commentId)
    .then(() => {
      res.status(204).sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};
