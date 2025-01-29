const db = require("../db/connection.js");
const { checkIfCommentExists } = require("./model-utils.js");

function removeCommentByCommentId(commentId) {
  return checkIfCommentExists(commentId).then(() => {
    return db.query("DELETE FROM comments WHERE comment_id = $1", [commentId]);
  });
}

module.exports = removeCommentByCommentId;
