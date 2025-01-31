const db = require("../db/connection.js");
const {
  checkIfValidUserExists,
  checkIfTopicExists,
} = require("./model-utils.js");

function insertNewArticle(newArticle) {
  const queryStrings = [
    newArticle.author,
    newArticle.body,
    newArticle.title,
    newArticle.topic,
  ];

  const defaultImgUrl =
    "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?w=700&h=700";
  if (queryStrings.includes(undefined)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return checkIfValidUserExists(newArticle.author)
    .then(() => {
      return checkIfTopicExists(newArticle.topic);
    })
    .then(() => {
      if (!newArticle.article_img_url) {
        queryStrings.push(defaultImgUrl);
      } else {
        queryStrings.push(newArticle.article_img_url);
      }
      return db
        .query(
          "INSERT INTO articles (author, body, title, topic, article_img_url) VALUES ($1,$2,$3,$4,$5) RETURNING *",
          queryStrings
        )
        .then((article) => {
          return article.rows[0];
        });
    });
}

module.exports = { insertNewArticle };
