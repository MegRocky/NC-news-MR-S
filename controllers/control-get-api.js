const endpointsData = require("../endpoints.json");
const selectArticleById = require("../models/model-select-article.js");
const selectTopics = require("../models/model-select-topics.js");

exports.getApi = (req, res, next) => {
  res
    .status(200)
    .send({ endpoints: endpointsData })
    .catch((err) => {
      next(err);
    });
};

exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics: topics.rows });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  selectArticleById(articleId)
    .then((article) => {
      console.log({ article: article.rows[0] });
      res.status(200).send({ article: article.rows[0] });
    })
    .catch((err) => {
      next(err);
    });
};
