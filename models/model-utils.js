const { string } = require("pg-format");
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

function checkIfValidUserExists(username) {
  if (typeof username !== "string") {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  } else {
    return db
      .query("SELECT * FROM users WHERE username = $1", [username])
      .then((userQ) => {
        if (userQ.rowCount === 0) {
          return Promise.reject({ status: 404, msg: "User Not Found" });
        }
      });
  }
}

function checkIfCommentExists(commentId) {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1", [commentId])
    .then((commentQ) => {
      if (commentQ.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Comment Not Found" });
      } else {
        return;
      }
    });
}

module.exports = {
  checkIfArticleExists,
  checkIfValidUserExists,
  checkIfCommentExists,
};
