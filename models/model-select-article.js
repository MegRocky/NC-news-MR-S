const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function selectArticleById(id) {
  return checkIfArticleExists(id)
    .then(() => {
      return db.query("SELECT * FROM articles WHERE article_id = $1", [id]);
    })
    .then((res) => {
      return res.rows[0];
    });
}

function selectArticles(order = "desc", sortedBy = "created_at") {
  const greenlist = [
    "asc",
    "desc",
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  let queryStr = `SELECT articles.author,title,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,CAST(COUNT(comments.comment_id) AS int) AS comment_count  FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY (articles.article_id)`;
  let queryValues = [];
  if (!greenlist.includes(sortedBy) && !greenlist.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Query" });
  } else {
    queryStr += `ORDER BY ${sortedBy} ${order}`;
    return db.query(queryStr).then((res) => {
      return res.rows;
    });
  }
}

module.exports = { selectArticleById, selectArticles };
