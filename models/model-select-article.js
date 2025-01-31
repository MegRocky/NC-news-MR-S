const db = require("../db/connection.js");
const { checkIfArticleExists } = require("./model-utils.js");

function selectArticleById(id) {
  return checkIfArticleExists(id)
    .then(() => {
      return db.query(
        "SELECT articles.author,title,articles.body,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,CAST(COUNT(comments.comment_id) AS int) AS comment_count  FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;",
        [id]
      );
    })
    .then((res) => {
      return res.rows[0];
    });
}

function selectArticles(
  order = "desc",
  sortedBy = "created_at",
  topic,
  p,
  limit = 10
) {
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

  if (!greenlist.includes(sortedBy) || !greenlist.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Query" });
  }

  if (isNaN(limit)) {
    return Promise.reject({ status: 400, msg: "Bad Query" });
  }

  let queryStr = `SELECT articles.author,title,articles.article_id,topic,articles.created_at,articles.votes,article_img_url,CAST(COUNT(comments.comment_id) AS int) AS comment_count, count(*) OVER () as total_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id`;
  const queryValues = assembleQueryValues(topic, p, limit);

  const groupByArticle = " GROUP BY (articles.article_id) ";

  if (topic) {
    queryStr += " WHERE topic = $1 ";
  }
  queryStr += groupByArticle;
  queryStr += `ORDER BY ${sortedBy} ${order}`;
  if (p) {
    if (isNaN(p)) {
      return Promise.reject({ status: 400, msg: "Bad Query" });
    }
    queryStr += ` LIMIT $${queryValues.length - 1} OFFSET $${
      queryValues.length
    }`;
  }

  return db.query(queryStr, queryValues).then((articles) => {
    let totalCount = 0;
    if (articles.rows.length !== 0) {
      totalCount = Number(articles.rows[0].total_count);
    }
    articles.rows.forEach((article) => {
      delete article.total_count;
    });
    return { articles: articles.rows, total_count: totalCount };
  });
}

function assembleQueryValues(topic, p, limit) {
  const queryValues = [];
  if (topic) {
    queryValues.push(topic);
  }
  if (p) {
    let offset = 0;
    if (p > 1) {
      offset = (p - 1) * limit;
    }
    queryValues.push(limit, offset);
  }
  return queryValues;
}

module.exports = { selectArticleById, selectArticles };
