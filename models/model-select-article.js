const db = require("../db/connection.js");

function selectArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((res) => {
      if (res.rowCount === 0) {
        res.msg = "Article Not Found";
        return Promise.reject(res);
      } else {
        return res;
      }
    });
}

module.exports = selectArticleById;
