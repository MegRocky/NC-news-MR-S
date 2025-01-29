const endpointsData = require("../endpoints.json");
const {
  selectArticleById,
  selectArticles,
} = require("../models/model-select-article.js");

const {
  selectCommentsByArticleId,
} = require("../models/model-select-comments.js");
const selectTopics = require("../models/model-select-topics.js");
const selectUsers = require("../models/model-select-users.js");

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
      res.status(200).send({ topics: topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  selectArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles: articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;

  selectCommentsByArticleId(articleId)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users: users });
    })
    .catch((err) => {
      next(err);
    });
};
