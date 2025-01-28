const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function insertCommentsByArticleId(articleId, newComment) {
  return checkIfArticleExists(articleId)
    .then(() => {
      return db.query(
        "INSERT INTO comments (author, body, article_id) VALUES ($1,$2,$3) RETURNING *",
        [newComment.username, newComment.body, articleId]
      );
    })
    .then((res) => {
      return res.rows[0];
    });
}

module.exports = { insertCommentsByArticleId };
