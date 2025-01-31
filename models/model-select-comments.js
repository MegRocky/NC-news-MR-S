const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function selectCommentsByArticleId(id) {
  return checkIfArticleExists(id)
    .then(() => {
      return db.query(
        "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
        [id]
      );
    })
    .then((comments) => {
      return comments.rows;
    });
}

module.exports = { selectCommentsByArticleId };
