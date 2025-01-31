const db = require("../db/connection.js");
const {
  checkIfArticleExists,
  checkIfCommentExists,
} = require("./model-utils.js");

function updateVotesByArticleId(articleId, incrementNum) {
  return checkIfArticleExists(articleId)
    .then(() => {
      return db.query(
        "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
        [incrementNum, articleId]
      );
    })
    .then((article) => {
      return article.rows[0];
    });
}

function updateVotesByCommentId(commentId, incrementNum) {
  return checkIfCommentExists(commentId)
    .then(() => {
      return db.query(
        "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *",
        [incrementNum, commentId]
      );
    })
    .then((comment) => {
      return comment.rows[0];
    });
}

module.exports = { updateVotesByArticleId, updateVotesByCommentId };
