const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function updateVotesByArticleId(articleId, incrementNum) {
  return checkIfArticleExists(articleId)
    .then(() => {
      return db.query(
        "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *",
        [incrementNum, articleId]
      );
    })
    .then((res) => {
      return res.rows[0];
    });
}

module.exports = { updateVotesByArticleId };
