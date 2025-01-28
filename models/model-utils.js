const db = require("../db/connection.js");

function checkIfArticleExists(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((articleQ) => {
      if (articleQ.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
    });
}

module.exports = { checkIfArticleExists };
