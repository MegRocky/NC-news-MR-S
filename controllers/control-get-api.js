const {
  selectCommentsByArticleId,
} = require("../models/model-select-comments.js");
const selectTopics = require("../models/model-select-topics.js");
const {
  selectUsers,
  selectUsersByUsername,
} = require("../models/model-select-users.js");
const endpointsData = require("../endpoints.json");
const {
  selectArticleById,
  selectArticles,
} = require("../models/model-select-article.js");

exports.getApi = (req, res, next) => {
  res.status(200).send({ endpoints: endpointsData });
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
  const order = req.query.order;
  const sortedBy = req.query.sorted_by;
  const topic = req.query.topic;
  const page = req.query.p;
  const limit = req.query.limit;

  selectArticles(order, sortedBy, topic, page, limit)
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const articleId = req.params.article_id;
  const page = req.query.p;
  const limit = req.query.limit;
  selectCommentsByArticleId(articleId, page, limit)
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

exports.getUsersByUsername = (req, res, next) => {
  const username = req.params.username;
  selectUsersByUsername(username)
    .then((users) => {
      res.status(200).send({ user: users });
    })
    .catch((err) => {
      next(err);
    });
};
