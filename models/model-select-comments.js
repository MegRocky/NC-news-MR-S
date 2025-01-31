const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function selectCommentsByArticleId(id, page, limit = 10) {
  const queryValues = [id, limit];
  return checkIfArticleExists(id)
    .then(() => {
      let offset = 0;
      if (page) {
        if (isNaN(page)) {
          return Promise.reject({ status: 400, msg: "Bad Query" });
        }
        if (page > 1) {
          offset = (page - 1) * limit;
        }
      }
      queryValues.push(offset);
      if (isNaN(limit)) {
        return Promise.reject({ status: 400, msg: "Bad Query" });
      }

      return db.query(
        "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
        queryValues
      );
    })
    .then((comments) => {
      return comments.rows;
    });
}

module.exports = { selectCommentsByArticleId };
